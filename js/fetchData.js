const API_KEY = "296755af1ea74ca99f2c1a13314f5f83";
const END_POINT =
  "https://api.spoonacular.com/food/restaurants/search?cuisine=";

const searchBox = document.querySelector("#inputQuery");

let resultsArray = localStorage.getItem("searched-results")
  ? JSON.parse(localStorage.getItem("searched-results"))
  : NaN;

const fetchData = async (event) => {
  event.preventDefault();
  const searchVal = searchBox.value;
  const myFetch = await fetch(`${END_POINT}${searchVal}`, {
    method: "GET",
    headers: {
      "x-api-key": API_KEY,
    },
  });
  const data = await myFetch.json();
  resultsArray = data;
  localStorage.setItem("searched-results", JSON.stringify(resultsArray));
  console.log(resultsArray);
};

const contentSection = document.querySelector("#content-section");
let increment = 0;
const showData = (n) => {
  console.log(resultsArray);
  resultsArray["restaurants"]
    .slice(0, (increment = increment + n))
    .forEach((element, i) => {
      const cardDiv = `<div class="card">
    <div class="card-headers">
      <img
        src=${element.logo_photos[0]}
      />
    </div>
    <div class="card-content">
      <h3>${element.name}</h3>
      <div>
        <h3>${"$".repeat(element.dollar_signs)}</h3>
        <h4>★ ${element.weighted_rating_value.toFixed(1)}</h4>
      </div>
    </div>
    <div class="card-footer">
      <p>${element.address.street_addr}</p>
      <p>${
        element.pickup_enabled ? "Pickup Available" : "Pickup Not Available"
      }</p>
    </div>
  </div>`;
      const range = document.createRange();
      const fragment = range.createContextualFragment(cardDiv);
      contentSection.appendChild(fragment);
    });
};
