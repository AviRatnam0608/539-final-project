// import cardTemplate from "./cardTemplate";

const API_KEY = "a611bb0a0300468584eb2f52d9379533";
const END_POINT =
  "https://api.spoonacular.com/food/restaurants/search?cuisine=";

const searchBox = document.querySelector("#inputQuery");
let increment = 0;
let resultsArray = localStorage.getItem("searched-results")
  ? JSON.parse(localStorage.getItem("searched-results"))
  : NaN;

const loadingSpinner = `<svg
xmlns="http://www.w3.org/2000/svg"
xmlns:xlink="http://www.w3.org/1999/xlink"
style="
  margin: auto;
  background: none;
  display: block;
  shape-rendering: auto;
"
width="75px"
height="75px"
viewBox="0 0 100 100"
preserveAspectRatio="xMidYMid"
>
<circle
  cx="50"
  cy="50"
  fill="none"
  stroke="#ffffff"
  stroke-width="10"
  r="35"
  stroke-dasharray="164.93361431346415 56.97787143782138"
>
  <animateTransform
    attributeName="transform"
    type="rotate"
    repeatCount="indefinite"
    dur="1.6129032258064517s"
    values="0 50 50;360 50 50"
    keyTimes="0;1"
  ></animateTransform>
</circle>
<!-- [ldio] generated by https://loading.io/ -->
</svg>`;

const fetchData = async (event) => {
  event.preventDefault();
  increment = 0;
  const searchVal = searchBox.value;
  document.querySelector("#search-result").innerHTML = loadingSpinner;
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
const loadMore = document.querySelector("#load-more");
const noContent = `<div>No search results :(</div>`;

const showData = (n) => {
  console.log(resultsArray);
  // resultsArray["restaurants"].length !== 0
  //   ?
  //   : loadMore.setAttribute(hidden);
  resultsArray["restaurants"]
    .slice(increment, (increment = increment + n))
    .forEach((element, i) => {
      const cardDiv = `
      <a class="card" key=${i} href="restaurant.html?name=${element.name}">
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
        </a>`;
      const range = document.createRange();
      const fragment = range.createContextualFragment(cardDiv);
      contentSection.appendChild(fragment);
    });
};

const noResults = `<h3>no results</h3>`;

const filterSearchResults = (event) => {
  event.preventDefault();

  document.querySelectorAll(".toggleThis").forEach((element) => {
    element.removeAttribute("hidden");
  });

  document.querySelector("#filter-options").innerHTML = "";
  // document.querySelector("body").removeAttribute("onload");
  const filterSearchValue = document
    .querySelector("#input-search")
    .value.toLowerCase();
  resultsArray["restaurants"].filter((element, i) => {
    if (element.name.toLowerCase().includes(filterSearchValue)) {
      const cardDiv = `
      <a class="card" key=${i} href="restaurant.html?name=${element.name}">
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
        </a>`;
      const range = document.createRange();
      const fragment = range.createContextualFragment(cardDiv);
      document.querySelector("#filter-options").appendChild(fragment);
    }
  });
  if (document.querySelector("#filter-options").childNodes.length === 0) {
    document.querySelector("#filter-options").textContent = "no results";
  }
};

const filterByPrice = (event) => {
  event.preventDefault();

  document.querySelectorAll(".toggleThis").forEach((element) => {
    element.removeAttribute("hidden");
  });

  document.querySelector("#filter-options").innerHTML = "";
  const filterDollar = document.querySelector("#priceSearch").value;
  resultsArray["restaurants"].filter((element, i) => {
    if (element.dollar_signs >= filterDollar) {
      const cardDiv = `
      <a class="card" key=${i} href="restaurant.html?name=${element.name}">
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
        </a>`;
      console.log(element.name);
      const range = document.createRange();
      const fragment = range.createContextualFragment(cardDiv);
      document.querySelector("#filter-options").appendChild(fragment);
    }
  });
  if (document.querySelector("#filter-options").childNodes.length === 0) {
    document.querySelector("#filter-options").textContent = "no results";
  }
};

const filterByRating = (event) => {
  event.preventDefault();

  document.querySelectorAll(".toggleThis").forEach((element) => {
    element.removeAttribute("hidden");
  });

  const filterRating = document.querySelector("#ratingSearch").value;
  resultsArray["restaurants"].filter((element, i) => {
    if (element.weighted_rating_value >= filterRating) {
      const cardDiv = `
      <a class="card" key=${i} href="restaurant.html?name=${element.name}">
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
        </a>`;
      console.log(element.name);
      const range = document.createRange();
      const fragment = range.createContextualFragment(cardDiv);
      document.querySelector("#filter-options").appendChild(fragment);
    }
  });
  if (document.querySelector("#filter-options").childNodes.length === 0) {
    document.querySelector("#filter-options").textContent = "no results";
  }
};
