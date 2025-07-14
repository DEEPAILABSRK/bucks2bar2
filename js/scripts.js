/**
 * Bucks2Bar2 - Currency Converter
 * Main JavaScript file
 */

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Sample drink price data (in USD) - In a real app, this would come from an API
  const drinkPrices = {
    beer: {
      USA: 7.0,
      UK: 6.5,
      Germany: 5.0,
      Japan: 8.0,
      Canada: 6.0,
      Thailand: 3.0,
    },
    wine: {
      USA: 10.0,
      UK: 8.5,
      Germany: 7.0,
      Japan: 12.0,
      Canada: 9.0,
      Thailand: 6.0,
    },
    cocktail: {
      USA: 14.0,
      UK: 12.0,
      Germany: 10.0,
      Japan: 15.0,
      Canada: 12.0,
      Thailand: 7.0,
    },
  };

  // Sample exchange rates (against USD) - In a real app, this would come from an API
  const exchangeRates = {
    USD: 1.0,
    EUR: 0.85,
    GBP: 0.75,
    JPY: 110.0,
    CAD: 1.25,
    THB: 33.0,
  };

  // Currency symbols
  const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    CAD: "C$",
    THB: "฿",
  };

  // Country to currency mapping
  const countryCurrency = {
    USA: "USD",
    UK: "GBP",
    Germany: "EUR",
    Japan: "JPY",
    Canada: "CAD",
    Thailand: "THB",
  };

  // Get elements
  const converterForm = document.getElementById("converterForm");
  const resultDiv = document.getElementById("result");
  const contactForm = document.getElementById("contactForm");

  // Handle form submission
  if (converterForm) {
    converterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const amount = parseFloat(document.getElementById("amount").value);
      const sourceCurrency = document.getElementById("sourceCurrency").value;
      const sourceCountry = document.getElementById("sourceCountry").value;
      const destCountry = document.getElementById("destCountry").value;
      const drinkType = document.getElementById("drinkType").value;

      // Convert to USD first (for simplicity)
      const amountInUSD = amount / exchangeRates[sourceCurrency];

      // Get the country currencies
      const sourceCurrencyCode = countryCurrency[sourceCountry];
      const destCurrencyCode = countryCurrency[destCountry];

      // Get source country amount in local currency
      const sourceAmount = amountInUSD * exchangeRates[sourceCurrencyCode];

      // Get destination country amount in local currency
      const destAmount = amountInUSD * exchangeRates[destCurrencyCode];

      // Get drink prices
      const sourceDrinkPrice =
        drinkPrices[drinkType][sourceCountry] *
        exchangeRates[sourceCurrencyCode];
      const destDrinkPrice =
        drinkPrices[drinkType][destCountry] * exchangeRates[destCurrencyCode];

      // Calculate number of drinks
      const sourceDrinks = Math.floor(sourceAmount / sourceDrinkPrice);
      const destDrinks = Math.floor(destAmount / destDrinkPrice);

      // Update the results
      document.getElementById("homeAmount").textContent = `${
        currencySymbols[sourceCurrencyCode]
      }${sourceAmount.toFixed(2)}`;
      document.getElementById("homeDrinks").textContent = sourceDrinks;
      document.getElementById("homePrice").textContent = `${
        currencySymbols[sourceCurrencyCode]
      }${sourceDrinkPrice.toFixed(2)}`;

      document.getElementById("destAmount").textContent = `${
        currencySymbols[destCurrencyCode]
      }${destAmount.toFixed(2)}`;
      document.getElementById("destDrinks").textContent = destDrinks;
      document.getElementById("destPrice").textContent = `${
        currencySymbols[destCurrencyCode]
      }${destDrinkPrice.toFixed(2)}`;

      // Show results
      resultDiv.classList.remove("d-none");
      resultDiv.classList.add("show");

      // Scroll to results
      resultDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }

  // Handle contact form submission
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // In a real app, this would send the form data to a server
      alert("Thank you for your message! We will get back to you soon.");

      // Reset the form
      contactForm.reset();
    });
  }

  // Initialize Bootstrap tooltips
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});
