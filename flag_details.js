const title = document.querySelector("title");
const flagPic = document.querySelector("#flagImage");
const backBtn = document.querySelector("#backBtn");
const flag_name = document.querySelector("#flag_name");
const p_element1 = document.querySelector(".p_element1");
const p_element2 = document.querySelector(".p_element2");
const p_element3 = document.querySelector(".p_element3");
const p_element4 = document.querySelector(".p_element4");
const p_element5 = document.querySelector(".p_element5");
const p_element6 = document.querySelector(".p_element6");

const getdata = JSON.parse(localStorage.getItem("flagname"));
let flag_details = {};
let flag_data = JSON.parse(localStorage.getItem("fav_list")) || [];


title.textContent = getdata.flag_name
flag_name.innerHTML = `${getdata.flagname} <span id='fav_icon'>❤︎</span>`;


backBtn.addEventListener("click", () => {
  location.href = "index.html";
});

// Fetching data
async function apiFetch() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  return res.json();
}

apiFetch().then((data) => {
  data.forEach((ele) => {
    const name = ele.name.common.length < ele.name.official.length ? ele.name.common : ele.name.official;

    if (name === getdata.flagname) {
      flag_details = {
        topLevelDomain: ele.tld[0],
        capital: ele.capital[0],
        region: ele.region,
        population: ele.population,
        area: ele.area,
        languages: ele.languages,
        flagIcon: ele.flag,
        flagImage: ele.flags.png,
        flagName: name,
        found: getdata.found || false, 
      };
    }
  });


  flagPic.src = flag_details.flagImage;
  p_element1.textContent = `Capital: ${flag_details.capital}`;
  p_element2.textContent = `Region: ${flag_details.region}`;
  p_element3.textContent = `Area: ${flag_details.area}`;

  const stringLang = Object.values(flag_details.languages).join(', ');
  p_element4.textContent = `Languages: ${stringLang}`;

  p_element5.innerHTML = `<h1>${flag_details.population}</h1> <span>population</span>`;
  p_element6.textContent = flag_details.flagIcon;

  const fav_icon = document.querySelector("#fav_icon");
  

  if (flag_data.some(flag => flag.flagName === flag_details.flagName)) {
    fav_icon.style.color = "red"; 
    flag_details.found = true;
  }

  fav_icon.addEventListener("click", () => {
    if (!flag_details.found) {
      flag_data.push(flag_details);
      localStorage.setItem("fav_list", JSON.stringify(flag_data));
      fav_icon.style.color = "red"; 
      flag_details.found = true;
      getdata.found = true;
      localStorage.setItem('flagname', JSON.stringify(getdata)); // Save back to local storage
    }
  });
});
