let countryContainer = document.querySelector(".countryContainer")
let searchInput = document.querySelector("#searchInput")
let noCountryMsg = document.querySelector('.noCountryMsg')
let selectRegion = document.querySelector("#selectRegion")
let modeBtn = document.querySelector(".modeBtn")
let body = document.querySelector("body")
let btnName = document.querySelector(".btnName")
const getData = async () => {
    try {
        const data = await fetch("./data.json")
        const response = await data.json();
        console.log(response);
        showCountry(response)
    } catch (error) {
        console.error("Error fetching country data:", error);
    }
}

getData();

let showCountry = (response) => {
    response.forEach((item) => {
        let countryDiv = document.createElement("div")
        countryDiv.classList.add("countryDiv")
        countryDiv.innerHTML = `
        <div class="imgDiv"> <img src="${item.flag}"></div>
        <div class="countryDetails">
        <p class="countryName" id="${item.name}">${item.name}</p>
        <p><b>Population:</b> ${item.population}</p>
        <p id="${item.region}" class="region"><b>Region:</b>  ${item.region}</p>
        <p><b>Capital:</b>  ${item.capital}</p>
        </div>
        `
        countryDiv.addEventListener("click", () => {
            window.location.href = `country-details.html?country=${item.name}`
        })

        countryContainer.appendChild(countryDiv)
    })

    searchInput.addEventListener("input", () => filterCountries(response))
    selectRegion.addEventListener("input", () => filterCountries(response))

}



let filterCountries = () => {

    //variable to store no country found
    let noMatch = true

    //storing the values that are typed in input field
    const searchText = searchInput.value.toLowerCase().trim();

    //storing the values that are selected in the selected field
    let regionSelect = selectRegion.value.toLowerCase().trim()


    //selecting all countries and making it invisible at first when e is triggered
    let allCountryDiv = document.querySelectorAll('.countryDiv')
    allCountryDiv.forEach(div => div.style.display = "none")


    //looping through each country and checking if it matches the search text and selected region.
    allCountryDiv.forEach((Div) => {

        //selecting id from div
        let countryName = Div.querySelector(".countryName")
        let countryId = countryName.getAttribute("id").toLowerCase();

        //selecting id from select input
        let countryRegionDiv = Div.querySelector(".region")
        let countryRegion = countryRegionDiv.getAttribute("id").toLowerCase();


        //storing the value of searched option from div
        let matchText = countryId.includes(searchText)

        //storing the value of selected option from select input
        let matchesCategory = regionSelect === countryRegion || regionSelect === "" || regionSelect === "all"


        //displaying only the selected or searched div
        if (matchText && matchesCategory) {
            Div.style.display = "flex"
            noMatch = false
        }
        else {
            Div.style.display = "none";
        }

    })

    //if no country found, display message
    if (noMatch) {
        noCountryMsg.classList.remove("hide")
        console.log("no country found")
    } else {
        noCountryMsg.classList.add("hide")
        console.log(noCountryMsg, "this is removed")
    }

}

let changeMode = () => {
    let darkSvg = modeBtn.querySelector("#darkSvg")
    let lightSvg = modeBtn.querySelector("#lightSvg")
    // Check the current mode based on the button's ID or class
    if (modeBtn.id === "dark") {
        body.classList.add("dark-mode");
        modeBtn.setAttribute("id", "light");
        btnName.innerHTML = "Light Mode"
        darkSvg.classList.add("hide");
        lightSvg.classList.remove("hide");
        console.log(lightSvg, "this is light mode");
    } else {
        body.classList.remove("dark-mode");
        modeBtn.setAttribute("id", "dark");
        btnName.innerHTML = "Dark Mode"
        darkSvg.classList.remove("hide");
        lightSvg.classList.add("hide");
        console.log(darkSvg, "this is dark mode");
    }
};

// Use "click" instead of "toggle"
modeBtn.addEventListener("click", changeMode);


