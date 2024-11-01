const title = document.querySelector("title")
const flagPic = document.querySelector("#flagImage")
const backBtn = document.querySelector("#backBtn")
const flag_name = document.querySelector("#flag_name")
const p_element1 = document.querySelector(".p_element1")
const p_element2 = document.querySelector(".p_element2")
const p_element3 = document.querySelector(".p_element3")
const p_element4 = document.querySelector(".p_element4")
const p_element5 = document.querySelector(".p_element5")
const p_element6 = document.querySelector(".p_element6")




const getTitle = localStorage.getItem("flagname")
let flag_details = {}
let flag_data = JSON.parse(localStorage.getItem("fav_list")) || [];
title.textContent = getTitle

backBtn.addEventListener("click",()=>{
  location.href = "index.html"
})

// fetching data
async function apiFetch(){
  const res = await fetch("https://restcountries.com/v3.1/all")
  return res.json()
}

apiFetch().then((data)=>{
  data.forEach((ele)=>{
    if(ele.name.common === getTitle){
      flag_details["topLevelDomain"] = ele.tld[0]
      flag_details["capital"] = ele.capital[0]
      flag_details["region"] = ele.regiong
      flag_details["population"] = ele.population
      flag_details["area"] = ele.area
      flag_details["languages"] = ele.languages
      flag_details["flagIcon"] = ele.flag
      flag_details["flagImage"] = ele.flags.png
    }
  })

  flagPic.src = flag_details.flagImage
  flag_name.innerHTML = `${getTitle} 
  <span id='fav_icon'>❤︎</span>`
  p_element1.textContent = `Capital: ${flag_details.capital}`
  p_element2.textContent = `Region: ${flag_details.region}`
  p_element3.textContent = `Area: ${flag_details.area}`

  let stringLang = " "
  for(let i in flag_details.languages){
    stringLang+=`${flag_details.languages[i]}, `
    p_element4.textContent = `Languages: ${stringLang}`
  }

  p_element5.innerHTML = `<h1>${flag_details.population}</h1> <span>population</span>`
  p_element6.textContent = flag_details.flagIcon


  let fav_icon = document.querySelector("#fav_icon")
  fav_icon.addEventListener("click",()=>{

    let message = window.confirm("Added in your favourite list")

    if(message == true){
      fav_icon.style.backgroundImage = "linear-gradient(120deg,red,gray)"
      
      if(!(flag_data.includes(flag_details))){
          flag_data.push(flag_details)
          localStorage.setItem("fav_list",JSON.stringify(flag_data))
      }
    }

  })
})


