const main_container = document.querySelector(".main_container")
const more_btn = document.querySelector("#more_btn")
const search_section = document.querySelector("#search_section")
const languages_select = document.querySelector("#languages_select")
const region_select = document.querySelector("#region_select")
const dropdown_list = document.querySelector("#dropdown_list")

// variables:
let languages = []
let region = []
let allcards = []
let dropDownData = []
let storeData = [];

const countryNamelist = [];

search_section.addEventListener("input",(e)=>{
  const value = e.target.value.toLowerCase();
  dropdown_list.innerHTML = ""
  dropdown_list.style.display = "none"

  if(value){
    const filter = countryNamelist.filter((ele)=>{
      return ele.toLowerCase().includes(value)
    })

    if(filter.length > 0){
      filter.forEach((ele)=>{
        const div = document.createElement("div")
        div.textContent = ele
        div.classList.add("dropdown_item")

        div.addEventListener("click", ()=>{
          search_section.value = ele;
          dropdown_list.innerHTML = ""
          dropdown_list.style.display = "none"
        })

        dropdown_list.append(div)
      })
      dropdown_list.style.display = "block"
    }
  }
})


document.addEventListener("click",(e)=>{
  if(!search_section.contains(e.target) && !dropdown_list.contains(e.target)){
    dropdown_list.style.display = "none"
  }
})


// fetching data
async function apiFetch(){
  const res = await fetch("https://restcountries.com/v3.1/all")
  return res.json()
}


apiFetch().then((data)=>{
  data.forEach((ele)=>{
    // storing region
    if(!(region.includes(ele.region))){
      region.push(ele.region)
    }
    //storing lanugages
    for(let i in ele.languages){
      if(!(languages.includes(ele.languages[i]))){
        languages.push(ele.languages[i])

      }
    }

    let obj = {
      name : ele.name.common.length < ele.name.official.length? ele.name.common:ele.name.official,
      languages:ele.languages,
      region: ele.region,
      count: 1
    }
    storeData.push(obj)
    countryNamelist.push(obj["name"])

  })

  languages = languages.sort()
  languages.forEach((lang) => {
    const newOption = document.createElement('option');
    newOption.value = lang; 
    newOption.textContent = lang;
    languages_select.add(newOption);
  });

  region= region.sort()
  region.forEach((re) => {
    const newOption = document.createElement('option');
    newOption.value = re; 
    newOption.textContent = re;
    region_select.add(newOption);
  });


  createCard(data)
})



// printing function

function createCard(data){
  let div 
  let img 
  let h2

    data.forEach((ele)=>{
      div = document.createElement("div")
      img = document.createElement("img")
      h2 = document.createElement("h2")
      div.className = "child"
      h2.className = "card_heading"
    
      allcards.push(div)
      div.append(h2,img)
      img.src = ele.flags.png
    
      const nameLen1 = ele.name.common
      const nameLen2 = ele.name.official
    
      if(nameLen1.length <= nameLen2.length){
        h2.textContent = ele.name.common
      }
      else{
        h2.textContent = ele.name.official
      }
    })

  let count = 10
    for(let i=0; i<10; i++){
      let card = allcards[i]
      main_container.append(card)
      if(i==10){
        count+=10
      }
   }
   
   more_btn.addEventListener("click",()=>{
    for(let i=0; i<count; i++){
      let card = allcards[i]
      main_container.append(card)

      if(count>allcards.length){
        more_btn.style.display = "none"
        break
      }
    }
    count+=10
  })

  allcards.forEach((ele)=>{
    ele.addEventListener("click",()=>{
      let flagName = ele.children[0].textContent
      localStorage.setItem("flagname", flagName)
      // window.open("flag_details.html", "_blank")
      location.href = "flag_details.html"

    })
  })
}


search_section.addEventListener("change",(e)=>{
  let change = e.target.value.toLowerCase()

  if(change !== "none"){
      allcards.forEach((card)=>{
        card.style.display = "none"
      })
      allcards.forEach((ele)=>{
        let foundHeading = ele.children[0].textContent.toLowerCase()
          if(foundHeading.includes(change)){
            ele.style.display = "block"
            main_container.append(ele)
          }
      })
  }
  else{
    allcards.forEach((card)=>{
      card.style.display = "block"
    })
  }

})



languages_select.addEventListener("change",(e)=>{
  const value = e.target.value;
  // console.log(languages_select.value)

  if(value !== 'none'){
      allcards.forEach((card)=>{
        card.style.display = "none"
      })
    
      storeData.forEach((ele)=>{
        let name = ele["name"];
        let languages = ele["languages"]
    
        for(let i in languages){
          if(languages[i]===value){
    
          allcards.forEach((card)=>{
            let foundHeading = card.children[0].textContent
              if(name === foundHeading){
                card.style.display = "block"
                main_container.append(card)
              }
    
            })
          }
        }
      })
    }
  else{
    allcards.forEach((card)=>{
      card.style.display = "block"
    })
  }

})


region_select.addEventListener("change",(e)=>{
  const value = e.target.value;

  if(value !== "none"){
    allcards.forEach((card)=>{
      card.style.display = "none"
    })

    storeData.forEach((ele)=>{
      let name = ele["name"];
      let region = ele["region"]

      if(region ===value){
        console.log(region,value)
        allcards.forEach((card)=>{
          let foundHeading = card.children[0].textContent
            if(name === foundHeading){
              card.style.display = "block"
              main_container.append(card)
            }
        })
      }
    })
  }
  else{
    allcards.forEach((card)=>{
      card.style.display = "block"
    })
  }

})


