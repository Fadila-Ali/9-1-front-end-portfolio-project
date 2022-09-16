// select form tag
const form = document.querySelector("form");

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
      // this is the error message
      const error = document.querySelector("#error");
      if (resJson.status && resJson.status === 404) {
        error.style.display = "block";
        return;
      }
      if (userInput === "") {
        error.style.display = "block";
        return;
      }

      // this is where I want to display the main content
      const main = document.querySelector(".main");
      main.innerHTML = "";

      // get the name of the country
      const countryName = document.createElement("p");
      countryName.innerHTML = `<strong>Country: </strong>${resJson[0].name.common}`;
      main.append(countryName);

      // get the capital city of country
      const countryCapital = document.createElement("p");
      countryCapital.innerHTML = `<strong>Capital City(s): </strong>${resJson[0].capital}`;
      main.append(countryCapital);

      // get continent in which country is located
      const countryContinent = document.createElement("p");
      countryContinent.innerHTML = `<strong>Continent: </strong>${resJson[0].continents}`;
      main.append(countryContinent);

      // get country subregion
      const countryRegion = document.createElement("p");
      countryRegion.innerHTML = `<strong>Region: </strong>${resJson[0].subregion}`;
      main.append(countryRegion);

      // get country's population
      const population = document.createElement("p");
      population.innerHTML = `<strong>Total Population: </strong>${resJson[0].population}`;
      main.append(population);

      // get the surface area of country
      const countryArea = document.createElement("p");
      countryArea.innerHTML = `<strong>Total Surface Area: </strong>${resJson[0].area}`;
      main.append(countryArea);

      // get currencies of the country
      const countryCurrencies = document.createElement("p");
      let money = Object.values(resJson[0].currencies);
      countryCurrencies.innerHTML = `<strong>Currency: </strong>${money[0].name} (${money[0].symbol})`;
      main.append(countryCurrencies);

      // get languages og the country
      const languagesP = document.createElement("p");
      languagesP.innerHTML = `<strong>Languages Spoken in ${resJson[0].name.common}: </strong>`;
      const languagesUl = document.createElement("ul");
      let languages = Object.values(resJson[0].languages);
      for (let i = 0; i < languages.length; i++) {
        const languagesLi = document.createElement("li");
        languagesLi.innerHTML = languages[i];
        languagesUl.appendChild(languagesLi);
      }
      main.append(languagesP, languagesUl);

      // grab the ul inside of the "aside"
      // create a list and give it the value of alt spellings
      const spell = document.createElement("p");
      spell.innerHTML = `<strong>Alternative Spellings for ${resJson[0].name.common}: </strong>`;
      const spellUl = document.createElement("ul");
      main.append(spell, spellUl);
      let str = resJson[0].altSpellings.map((item) => item).join(",");
      const arr = str.split(",");
      for (let i = 0; i < arr.length; i++) {
        const otherSpellings = document.createElement("li");
        otherSpellings.innerText = arr[i];
        spellUl.appendChild(otherSpellings);
      }
      // main content done

      // flag side
      // get the flag of country
      const flagSide = document.querySelector(".side1");
      flagSide.innerHTML = "";
      const innerFlag = document.createElement("div");
      flagSide.append(innerFlag);
      const flagIn = document.createElement("div");
      const flagOut = document.createElement("div");
      innerFlag.append(flagIn, flagOut);
      const h2Flag = document.createElement("h2");
      h2Flag.innerHTML = "Flag";
      const countryFlag = document.createElement("img");
      countryFlag.setAttribute("src", `${resJson[0].flags.png}`);
      countryFlag.setAttribute("alt", `The flag of ${resJson[0].name.common}`);
      flagIn.appendChild(h2Flag);
      flagOut.appendChild(countryFlag);
      // flag done

      // coat side
      // get coat of arms
      const coatSide = document.querySelector(".side2");
      coatSide.innerHTML = "";
      const innerCoat = document.createElement("div");
      coatSide.append(innerCoat);
      const coatIn = document.createElement("div");
      const coatOut = document.createElement("div");
      innerCoat.append(coatIn, coatOut);
      const h2Coat = document.createElement("h2");
      h2Coat.innerHTML = "Coat of Arms";
      const coatOfArms = document.createElement("img");
      coatOfArms.setAttribute("src", `${resJson[0].coatOfArms.png}`);
      coatOfArms.setAttribute(
        "alt",
        `The coat of arms image of ${resJson[0].name.common}`
      );
      coatIn.appendChild(h2Coat);
      coatOut.appendChild(coatOfArms);
    })
    .catch((err) => console.log(err));
});

// All done :-)
