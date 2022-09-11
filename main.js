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

  fetch(url)
    .then((res) => res.json())
    .then((resJson) => {
      console.log(resJson);
      // grab the ul inside of the "aside"
      // create a list and give it the value of alt spellings
      const ul = document.querySelector("ul");
      const otherSpellings = document.createComment("li");
      otherSpellings.innerText = "";
      const spellings = resJson[0].altSpellings.map((i) => {
        return i;
      });
      otherSpellings.innerText = `${spellings}`;
      ul.append(otherSpellings);
      // list done

      // this is where I want to display the main content
      const leftMain = document.querySelector(".left");
      const rightMain = document.querySelector(".right");

      // get the name of the country
      const countryName = document.createElement("h4");
      countryName.innerHTML = "";
      countryName.innerText = `${resJson[0].name.common}`;
      leftMain.append(countryName);

      // get the map of the country
      const countryMap = document.createElement("img");
      countryMap.innerHTML = "";
      countryMap.setAttribute("src", `${resJson[0].maps.openStreetMaps.value}`);
      countryMap.setAttribute("alt", `A map of ${resJson[0].name.common}`);
      rightMain.append(countryMap);
    })
    .catch((err) => console.log(err));

  form.reset();
});
