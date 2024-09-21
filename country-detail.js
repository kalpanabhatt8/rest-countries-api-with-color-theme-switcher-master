document.addEventListener("DOMContentLoaded", () => {
    // Query elements after the DOM is fully loaded
    let modeBtn = document.querySelector(".modeBtn");
    let body = document.querySelector("body");
    let btnName = document.querySelector(".btnName");

    let changeMode = () => {
        let darkSvg = modeBtn.querySelector("#darkSvg");
        let lightSvg = modeBtn.querySelector("#lightSvg");

        // Check the current mode based on the button's ID
        if (modeBtn.id === "dark") {
            body.classList.add("dark-mode");
            modeBtn.setAttribute("id", "light");
            btnName.innerHTML = "Light Mode";
            darkSvg.classList.add("hide");
            lightSvg.classList.remove("hide");
            console.log(lightSvg, "this is light mode");
        } else {
            body.classList.remove("dark-mode");
            modeBtn.setAttribute("id", "dark");
            btnName.innerHTML = "Dark Mode";
            darkSvg.classList.remove("hide");
            lightSvg.classList.add("hide");
            console.log(darkSvg, "this is dark mode");
        }
    };

    // Use "click" instead of "toggle"
    modeBtn.addEventListener("click", changeMode);

    // Fetch and display country data
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const country = urlParams.get("country");
    console.log(country, "this is country");

    let countryData = async () => {
        let data = await fetch('./data.json');
        let response = await data.json();
        const countryData = response.find(item => item.name === country);
        let language = countryData.languages
        let currencies = countryData.currencies.map(currency => currency.name).join(', ');
        const languagesList = countryData.languages.map(language => language.name).join(", ");
        const borderCountryList = countryData.borders.map(border => border).join(", ");

        // let languageList = []
        // language.forEach(language => {
        //     language = language.name
        //     languageList.push(language)
        // })
        // console.log(languageList, "languages", language);
        console.log(countryData, "this is countryData");

        // Optionally, call a function to display the country data
        showCountry(countryData, languagesList, currencies, borderCountryList);
    };

    countryData();

    const showCountry = (countryData, languagesList, currencies, borderCountryList) => {
        let countryDetailPage = document.querySelector(".countryDetailPage");
        let countryDetails = document.querySelector(".countryDetails")
        countryDetailPage.querySelector(".flagImg").src = `${countryData.flag}`

        countryDetails.innerHTML = `
        <h1 class="countryNameHeading">${countryData.name}</h1>
        <div class="infoDiv">
        <div>
        <p><b>Native Name:</b>  ${countryData.nativeName}</p>
        <p><b>Population:</b>  ${countryData.population}</p>
        <p><b>Region:</b>  ${countryData.region}</p>
        <p><b>Sub Region:</b>  ${countryData.subregion}</p>
        <p><b>Capital:</b>  ${countryData.capital}</p>
        </div>
        <div>
        <p><b>Top Level Domain:</b>  ${countryData.topLevelDomain}</p>
        <p><b>Currencies:</b>  ${currencies}</p>
        <p><b>Languages:</b>  ${languagesList}</p>
        </div>
        </div>
        `
        let borderCountry = document.querySelector('.borderCountry')
        console.log(borderCountry, "this is borders")
        borderCountryList.split(', ').forEach(border => {
            let button = document.createElement('button');
            button.textContent = border;
            button.classList.add('border-country-btn'); // Optional: add a class for styling
            borderCountry.appendChild(button); // Append each button to the container
        });

    };

    let backBtn = document.querySelector('.backBtn')

    backBtn.addEventListener('click', () => {
        window.location.href = `index.html`;
    })
});
