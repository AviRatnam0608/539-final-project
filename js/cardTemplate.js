const cardTemplate = (element) => {
  return `<div class="card" key=${i}>
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
};

export default cardTemplate;
