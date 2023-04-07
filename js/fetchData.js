const API_KEY = "296755af1ea74ca99f2c1a13314f5f83";
const END_POINT =
  "https://api.spoonacular.com/food/restaurants/search?cuisine=";

const searchBox = document.querySelector("#inputQuery");
let increment = 0;
let resultsArray = localStorage.getItem("searched-results")
  ? JSON.parse(localStorage.getItem("searched-results"))
  : NaN;

const fetchData = async (event) => {
  event.preventDefault();
  increment = 0;
  const searchVal = searchBox.value;
  document.querySelector("#search-result").innerHTML = `<div>Loading...</div>`;
  const myFetch = await fetch(`${END_POINT}${searchVal}`, {
    method: "GET",
    headers: {
      "x-api-key": API_KEY,
    },
  });
  const data = await myFetch.json();
  resultsArray = data;
  localStorage.setItem("searched-results", JSON.stringify(resultsArray));
  document.querySelector(
    "#search-result"
  ).innerHTML = `<a id="search-button" href="resultsPage.html">view all ${resultsArray["restaurants"].length} results</a>
  `;
  console.log(resultsArray);
};

const contentSection = document.querySelector("#content-section");

const showData = (n) => {
  console.log(resultsArray);
  resultsArray["restaurants"]
    .slice(increment, (increment = increment + n))
    .forEach((element, i) => {
      const cardDiv = `<div class="card" key=${i}>
    <div class="card-headers">
      <img
        src=${element.logo_photos[0]}
        alt=${element.name}
      />
    </div>
    <div class="card-content">
      <h3>${element.name}</h3>
      <div>
        <h3>${
          element.dollar_signs ? "$".repeat(element.dollar_signs) : "N/A"
        }</h3>
        <h4>★ ${
          element.weighted_rating_value
            ? element.weighted_rating_value.toFixed(1)
            : "N/A"
        }</h4>
      </div>
    </div>
    <div class="card-footer">
      <p>${element.address.street_addr}</p>
      <p class=${
        element.offers_first_party_delivery ? "available" : "unavailable"
      }>
      ${
        element.offers_first_party_delivery
          ? "Delivery Available"
          : "Delivery Not Available"
      }</p>
    </div>
  </div>`;
      const range = document.createRange();
      const fragment = range.createContextualFragment(cardDiv);
      contentSection.appendChild(fragment);
    });
};
