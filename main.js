const url = "https://restcountries.com/v3.1/all";

fetch(url)
  .then((res) => res.json())
  .then((resJson) => {
    console.log(resJson);
  })
  .catch((err) => console.log(err));
