// select some html tags
const form = document.querySelector("form");
const main = document.querySelector("main");

// this is where the user inputted the name of the country
const searchValue = document.querySelector("#country");

form.addEventListener("submit", (event) => {
  // Prevent default dehavior
  event.preventDefault();

  // grab the user input
  let userInput = searchValue.value;

  // array of objects API's for countries of the world
  const url = `https://restcountries.com/v3.1/name/${userInput}?fullText=true`;
  form.reset();
  fetch(url)
    .then((res) => res.json())
    .then((resJson) => {
      console.log(resJson);

      // grab the ul inside of the "aside"
      // create a list and give it the value of alt spellings
      // const ul = document.querySelector("ul");
      const other = document.querySelector(".otherSpellings");
      other.innerHTML = "";
      let str = resJson[0].altSpellings.map((item) => item).join(",");
      const arr = str.split(",");
      for (let i = 0; i < arr.length; i++) {
        const otherSpellings = document.createElement("li");
        otherSpellings.innerText = arr[i];
        // ul.appendChild(otherSpellings);
        other.appendChild(otherSpellings);
      }

      // list done

      // this is where I want to display the main content
      const leftMain = document.querySelector(".left");
      leftMain.innerHTML = "";

      // get the flag of country
      const countryFlag = document.createElement("img");
      countryFlag.setAttribute("src", `${resJson[0].flags.png}`);
      countryFlag.setAttribute("alt", `The flag of ${resJson[0].name.common}`);
      leftMain.append(countryFlag);

      // get the name of the country
      const countryName = document.createElement("p");
      countryName.innerHTML = `<strong>Country: </strong>${resJson[0].name.common}`;
      leftMain.append(countryName);

      // get the capital city of country
      const countryCapital = document.createElement("p");
      countryCapital.innerHTML = `<strong>Capital City(s): </strong>${resJson[0].capital}`;
      leftMain.append(countryCapital);

      // aside 2
      const sideTwo = document.querySelector(".side2");
      sideTwo.innerHTML = "";

      // get coat of arms
      const coatOfArms = document.createElement("img");
      coatOfArms.setAttribute("src", `${resJson[0].coatOfArms.png}`);
      coatOfArms.setAttribute(
        "alt",
        `The coat of arms image of ${resJson[0].name.common}`
      );
      const coatOfArmsParagraph = document.querySelector("p");
      coatOfArmsParagraph.innerHTML = `<strong>The Coat of Arms of ${resJson[0].name.common}`;
      sideTwo.append(coatOfArms, coatOfArmsParagraph);

      // get continent in which country is located
      const countryContinent = document.createElement("p");
      countryContinent.innerHTML = `<strong>Continent: </strong>${resJson[0].continents}`;
      leftMain.append(countryContinent);

      // get country subregion
      const countryRegion = document.createElement("p");
      countryRegion.innerHTML = `<strong>Region: </strong>${resJson[0].subregion}`;
      leftMain.append(countryRegion);

      // get country's population
      const population = document.createElement("p");
      population.innerHTML = `<strong>Total Population: </strong>${resJson[0].population}`;
      leftMain.append(population);

      // get the surface area of country
      const countryArea = document.createElement("p");
      countryArea.innerHTML = `<strong>Total Surface Area: </strong>${resJson[0].area}`;
      leftMain.append(countryArea);

      // get currencies of the country
      const countryCurrencies = document.createElement("p");
      let money = Object.values(resJson[0].currencies);
      countryCurrencies.innerHTML = `<strong>Currency: </strong>${money[0].name} (${money[0].symbol})`;
      leftMain.append(countryCurrencies);

      // get languages og the country
      const languagesP = document.createElement("p");
      languagesP.innerHTML = `<strong>Languages Spoken in ${resJson[0].name.common}: </strong>`;
      const languagesUl = document.createElement("ul");
      let languages = Object.values(resJson[0].languages);
      console.log(languages);
      for (let i = 0; i < languages.length; i++) {
        const languagesLi = document.createElement("li");
        languagesLi.innerHTML = languages[i];
        languagesUl.appendChild(languagesLi);
      }
      sideTwo.append(languagesP, languagesUl);
    })
    .catch((err) => console.log(err));
});
