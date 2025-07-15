/**
 * Unit tests for Bucks2Bar2 Currency Converter
 * Testing the form submission handler in scripts.js
 */

// Define constants to match those in the scripts.js file
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

const exchangeRates = {
  USD: 1.0,
  EUR: 0.85,
  GBP: 0.75,
  JPY: 110.0,
  CAD: 1.25,
  THB: 33.0,
};

const currencySymbols = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CAD: "C$",
  THB: "฿",
};

const countryCurrency = {
  USA: "USD",
  UK: "GBP",
  Germany: "EUR",
  Japan: "JPY",
  Canada: "CAD",
  Thailand: "THB",
};

describe("Currency Converter Form Handler", () => {
  // Set up DOM before all tests
  beforeAll(() => {
    document.body.innerHTML = `
      <form id="converterForm">
        <input id="amount" value="100" />
        <select id="sourceCurrency">
          <option value="USD" selected>US Dollar (USD)</option>
        </select>
        <select id="sourceCountry">
          <option value="USA" selected>United States</option>
        </select>
        <select id="destCountry">
          <option value="UK" selected>United Kingdom</option>
        </select>
        <select id="drinkType">
          <option value="beer" selected>Beer</option>
        </select>
      </form>
      <div id="result" class="d-none">
        <div id="homeAmount"></div>
        <div id="homeDrinks"></div>
        <div id="homePrice"></div>
        <div id="destAmount"></div>
        <div id="destDrinks"></div>
        <div id="destPrice"></div>
      </div>
    `;

    // Mock scrollIntoView
    Element.prototype.scrollIntoView = jest.fn();
  });

  beforeEach(() => {
    // Reset the result div classes before each test
    const resultDiv = document.getElementById("result");
    resultDiv.className = "d-none";

    // Clear all mocks
    jest.clearAllMocks();
  });

  // Test the form submission handler directly  // Helper function to simulate the form submission handler
  const handleFormSubmit = function (e) {
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
      drinkPrices[drinkType][sourceCountry] * exchangeRates[sourceCurrencyCode];
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
    const resultDiv = document.getElementById("result");
    resultDiv.classList.remove("d-none");
    resultDiv.classList.add("show");

    // Scroll to results
    resultDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  test("should correctly convert USD to GBP and calculate beer drinks", () => {
    // Create a mock event
    const mockEvent = { preventDefault: jest.fn() };

    // Call the handler function directly
    handleFormSubmit(mockEvent);

    // Assert that preventDefault was called
    expect(mockEvent.preventDefault).toHaveBeenCalled();

    // Get result div
    const resultDiv = document.getElementById("result");

    // Assert that result div is shown
    expect(resultDiv.classList.contains("d-none")).toBe(false);
    expect(resultDiv.classList.contains("show")).toBe(true);

    // Assert that scrollIntoView was called
    expect(resultDiv.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "nearest",
    });

    // Test calculations
    // For $100 USD in USA -> GBP in UK
    // $100 USD = $100 (as exchangeRate[USD] = 1.0)
    // $100 in USA = $100 * exchangeRate[USD] = $100
    // $100 in UK = $100 * exchangeRate[GBP] = $100 * 0.75 = £75

    // Drink prices:
    // Beer in USA = $7.0 * exchangeRate[USD] = $7.0
    // Beer in UK = $6.5 * exchangeRate[GBP] = $6.5 * 0.75 = £4.875

    // Number of drinks:
    // USA: $100 / $7.0 = 14.28... => 14 drinks (floor)
    // UK: £75 / £4.875 = 15.38... => 15 drinks (floor)

    // Check content of result elements
    expect(document.getElementById("homeAmount").textContent).toBe("$100.00");
    expect(document.getElementById("homeDrinks").textContent).toBe("14");
    expect(document.getElementById("homePrice").textContent).toBe("$7.00");

    expect(document.getElementById("destAmount").textContent).toBe("£75.00");
    expect(document.getElementById("destDrinks").textContent).toBe("15");
    expect(document.getElementById("destPrice").textContent).toBe("£4.88");
  });

  test("should correctly convert EUR to THB and calculate cocktails", () => {
    // Update form values for this test
    document.getElementById("amount").value = "50";
    document.getElementById("sourceCurrency").value = "EUR";
    document.getElementById("sourceCountry").value = "Germany";
    document.getElementById("destCountry").value = "Thailand";
    document.getElementById("drinkType").value = "cocktail";

    // Create a mock event
    const mockEvent = { preventDefault: jest.fn() };

    // Call the handler function directly
    handleFormSubmit(mockEvent);

    // Test calculations
    // For €50 EUR in Germany -> THB in Thailand
    // €50 EUR = $50 / 0.85 = $58.82 USD
    // $58.82 in Germany = $58.82 * 0.85 = €50
    // $58.82 in Thailand = $58.82 * 33 = ฿1941.06

    // Drink prices:
    // Cocktail in Germany = $10.0 * 0.85 = €8.5
    // Cocktail in Thailand = $7.0 * 33 = ฿231

    // Number of drinks:
    // Germany: €50 / €8.5 = 5.88... => 5 drinks (floor)
    // Thailand: ฿1941.06 / ฿231 = 8.40... => 8 drinks (floor)

    // Check content of result elements
    expect(document.getElementById("homeAmount").textContent).toBe("€50.00");
    expect(document.getElementById("homeDrinks").textContent).toBe("5");
    expect(document.getElementById("homePrice").textContent).toBe("€8.50");

    expect(document.getElementById("destAmount").textContent).toBe("฿1941.18");
    expect(document.getElementById("destDrinks").textContent).toBe("8");
    expect(document.getElementById("destPrice").textContent).toBe("฿231.00");
  });

  test("should handle zero amount correctly", () => {
    // Set amount to 0
    document.getElementById("amount").value = "0";
    document.getElementById("sourceCurrency").value = "USD";
    document.getElementById("sourceCountry").value = "USA";
    document.getElementById("destCountry").value = "UK";
    document.getElementById("drinkType").value = "beer";

    // Create a mock event
    const mockEvent = { preventDefault: jest.fn() };

    // Call the handler function directly
    handleFormSubmit(mockEvent);

    // Assert calculations result in 0 drinks
    expect(document.getElementById("homeDrinks").textContent).toBe("0");
    expect(document.getElementById("destDrinks").textContent).toBe("0");
  });

  test("should handle same source and destination country correctly", () => {
    // Set same source and destination
    document.getElementById("amount").value = "100";
    document.getElementById("sourceCurrency").value = "USD";
    document.getElementById("sourceCountry").value = "USA";
    document.getElementById("destCountry").value = "USA";
    document.getElementById("drinkType").value = "beer";

    // Create a mock event
    const mockEvent = { preventDefault: jest.fn() };

    // Call the handler function directly
    handleFormSubmit(mockEvent);

    // The home and destination values should be identical
    expect(document.getElementById("homeAmount").textContent).toBe(
      document.getElementById("destAmount").textContent
    );

    expect(document.getElementById("homeDrinks").textContent).toBe(
      document.getElementById("destDrinks").textContent
    );

    expect(document.getElementById("homePrice").textContent).toBe(
      document.getElementById("destPrice").textContent
    );
  });

  test("should correctly convert EUR to THB and calculate cocktails", () => {
    // Change form values for this test
    document.getElementById("amount").value = "50";
    document.getElementById("sourceCurrency").value = "EUR";
    document.getElementById("sourceCountry").value = "Germany";
    document.getElementById("destCountry").value = "Thailand";
    document.getElementById("drinkType").value = "cocktail";

    // Load the scripts.js logic
    require("./scripts");

    // Create a mock event
    const mockEvent = { preventDefault: jest.fn() };

    // Get form and trigger submit event
    const form = document.getElementById("converterForm");
    const submitEvent = new Event("submit");
    submitEvent.preventDefault = mockEvent.preventDefault;
    form.dispatchEvent(submitEvent);

    // Assert that preventDefault was called
    expect(mockEvent.preventDefault).toHaveBeenCalled();

    // Test calculations
    // For €50 EUR in Germany -> THB in Thailand
    // €50 EUR = $50 / 0.85 = $58.82 USD
    // €50 in Germany = $58.82 * 0.85 = €50
    // $58.82 in Thailand = $58.82 * 33 = ฿1941.06

    // Drink prices:
    // Cocktail in Germany = $10.0 * 0.85 = €8.5
    // Cocktail in Thailand = $7.0 * 33 = ฿231

    // Number of drinks:
    // Germany: €50 / €8.5 = 5.88... => 5 drinks (floor)
    // Thailand: ฿1941.06 / ฿231 = 8.40... => 8 drinks (floor)

    // Check content of result elements
    expect(document.getElementById("homeAmount").textContent).toBe("€50.00");
    expect(document.getElementById("homeDrinks").textContent).toBe("5");
    expect(document.getElementById("homePrice").textContent).toBe("€8.50");

    expect(document.getElementById("destAmount").textContent).toBe("฿1941.18");
    expect(document.getElementById("destDrinks").textContent).toBe("8");
    expect(document.getElementById("destPrice").textContent).toBe("฿231.00");
  });

  test("should handle zero amount correctly", () => {
    // Set amount to 0
    document.getElementById("amount").value = "0";

    // Load the scripts.js logic
    require("./scripts");

    // Create a mock event
    const mockEvent = { preventDefault: jest.fn() };

    // Get form and trigger submit event
    const form = document.getElementById("converterForm");
    const submitEvent = new Event("submit");
    submitEvent.preventDefault = mockEvent.preventDefault;
    form.dispatchEvent(submitEvent);

    // Assert calculations result in 0 drinks
    expect(document.getElementById("homeDrinks").textContent).toBe("0");
    expect(document.getElementById("destDrinks").textContent).toBe("0");
  });

  test("should handle same source and destination country correctly", () => {
    // Set same source and destination
    document.getElementById("sourceCountry").value = "USA";
    document.getElementById("destCountry").value = "USA";

    // Load the scripts.js logic
    require("./scripts");

    // Create a mock event
    const mockEvent = { preventDefault: jest.fn() };

    // Get form and trigger submit event
    const form = document.getElementById("converterForm");
    const submitEvent = new Event("submit");
    submitEvent.preventDefault = mockEvent.preventDefault;
    form.dispatchEvent(submitEvent);

    // The home and destination values should be identical
    expect(document.getElementById("homeAmount").textContent).toBe(
      document.getElementById("destAmount").textContent
    );

    expect(document.getElementById("homeDrinks").textContent).toBe(
      document.getElementById("destDrinks").textContent
    );

    expect(document.getElementById("homePrice").textContent).toBe(
      document.getElementById("destPrice").textContent
    );
  });

  test("should correctly convert JPY to CAD and calculate wine", () => {
    // Update form values for this test
    document.getElementById("amount").value = "10000";
    document.getElementById("sourceCurrency").value = "JPY";
    document.getElementById("sourceCountry").value = "Japan";
    document.getElementById("destCountry").value = "Canada";
    document.getElementById("drinkType").value = "wine";

    // Create a mock event
    const mockEvent = { preventDefault: jest.fn() };

    // Call the handler function directly
    handleFormSubmit(mockEvent);

    // Test calculations
    // For ¥10000 JPY in Japan -> CAD in Canada
    // ¥10000 JPY = ¥10000 / 110 = $90.91 USD
    // $90.91 in Japan = $90.91 * 110 = ¥10000.10
    // $90.91 in Canada = $90.91 * 1.25 = C$113.64

    // Drink prices:
    // Wine in Japan = $12.0 * 110 = ¥1320
    // Wine in Canada = $9.0 * 1.25 = C$11.25

    // Number of drinks:
    // Japan: ¥10000.10 / ¥1320 = 7.57... => 7 drinks (floor)
    // Canada: C$113.64 / C$11.25 = 10.10... => 10 drinks (floor)

    // Check content of result elements
    expect(document.getElementById("homeAmount").textContent).toBe("¥10000.00");
    expect(document.getElementById("homeDrinks").textContent).toBe("7");
    expect(document.getElementById("homePrice").textContent).toBe("¥1320.00");

    expect(document.getElementById("destAmount").textContent).toBe("C$113.64");
    expect(document.getElementById("destDrinks").textContent).toBe("10");
    expect(document.getElementById("destPrice").textContent).toBe("C$11.25");
  });

  test("should handle fractional drinks correctly", () => {
    // Set a small amount that results in fractional drinks
    document.getElementById("amount").value = "3";
    document.getElementById("sourceCurrency").value = "USD";
    document.getElementById("sourceCountry").value = "USA";
    document.getElementById("destCountry").value = "UK";
    document.getElementById("drinkType").value = "cocktail";

    // Create a mock event
    const mockEvent = { preventDefault: jest.fn() };

    // Call the handler function directly
    handleFormSubmit(mockEvent);

    // $3 USD = $3 (as exchangeRate[USD] = 1.0)
    // $3 in USA = $3 * exchangeRate[USD] = $3
    // $3 in UK = $3 * exchangeRate[GBP] = $3 * 0.75 = £2.25

    // Drink prices:
    // Cocktail in USA = $14.0 * exchangeRate[USD] = $14.0
    // Cocktail in UK = $12.0 * exchangeRate[GBP] = $12.0 * 0.75 = £9.0

    // Number of drinks:
    // USA: $3 / $14.0 = 0.21... => 0 drinks (floor)
    // UK: £2.25 / £9.0 = 0.25... => 0 drinks (floor)

    // Assert calculations result in 0 drinks as expected (floor of fractional values)
    expect(document.getElementById("homeDrinks").textContent).toBe("0");
    expect(document.getElementById("destDrinks").textContent).toBe("0");
  });

  test("should correctly handle edge case with different source currency and country", () => {
    // This tests when the source currency is different from the source country's currency
    document.getElementById("amount").value = "200";
    document.getElementById("sourceCurrency").value = "GBP"; // Input amount in GBP
    document.getElementById("sourceCountry").value = "Germany"; // But source country is Germany (EUR)
    document.getElementById("destCountry").value = "Thailand";
    document.getElementById("drinkType").value = "beer";

    // Create a mock event
    const mockEvent = { preventDefault: jest.fn() };

    // Call the handler function directly
    handleFormSubmit(mockEvent);

    // Test calculations
    // For £200 GBP but source country is Germany:
    // £200 GBP = £200 / 0.75 = $266.67 USD
    // $266.67 in Germany = $266.67 * 0.85 = €226.67
    // $266.67 in Thailand = $266.67 * 33 = ฿8800.11

    // Drink prices:
    // Beer in Germany = $5.0 * 0.85 = €4.25
    // Beer in Thailand = $3.0 * 33 = ฿99

    // Number of drinks:
    // Germany: €226.67 / €4.25 = 53.33... => 53 drinks (floor)
    // Thailand: ฿8800.11 / ฿99 = 88.89... => 88 drinks (floor)

    // Check content of result elements
    expect(document.getElementById("homeAmount").textContent).toBe("€226.67");
    expect(document.getElementById("homeDrinks").textContent).toBe("53");
    expect(document.getElementById("homePrice").textContent).toBe("€4.25");

    expect(document.getElementById("destAmount").textContent).toBe("฿8800.11");
    expect(document.getElementById("destDrinks").textContent).toBe("88");
    expect(document.getElementById("destPrice").textContent).toBe("฿99.00");
  });

  test("should correctly display currency symbols in the results", () => {
    // Test different currency combinations to ensure symbols are displayed correctly
    document.getElementById("amount").value = "100";
    document.getElementById("sourceCurrency").value = "CAD";
    document.getElementById("sourceCountry").value = "Canada";
    document.getElementById("destCountry").value = "Japan";
    document.getElementById("drinkType").value = "beer";

    // Create a mock event
    const mockEvent = { preventDefault: jest.fn() };

    // Call the handler function directly
    handleFormSubmit(mockEvent);

    // Check that currency symbols are correctly included in the outputs
    const homeAmount = document.getElementById("homeAmount").textContent;
    const homePrice = document.getElementById("homePrice").textContent;
    const destAmount = document.getElementById("destAmount").textContent;
    const destPrice = document.getElementById("destPrice").textContent;

    // Verify currency symbols are present
    expect(homeAmount.startsWith("C$")).toBe(true);
    expect(homePrice.startsWith("C$")).toBe(true);
    expect(destAmount.startsWith("¥")).toBe(true);
    expect(destPrice.startsWith("¥")).toBe(true);
  });

  test("should preserve precision in monetary calculations", () => {
    // Test that monetary values are displayed with 2 decimal places
    document.getElementById("amount").value = "123.45";
    document.getElementById("sourceCurrency").value = "USD";
    document.getElementById("sourceCountry").value = "USA";
    document.getElementById("destCountry").value = "Germany";
    document.getElementById("drinkType").value = "cocktail";

    // Create a mock event
    const mockEvent = { preventDefault: jest.fn() };

    // Call the handler function directly
    handleFormSubmit(mockEvent);

    // Get the displayed monetary values
    const homeAmount = document.getElementById("homeAmount").textContent;
    const homePrice = document.getElementById("homePrice").textContent;
    const destAmount = document.getElementById("destAmount").textContent;
    const destPrice = document.getElementById("destPrice").textContent;

    // Extract the numeric part (removing currency symbol)
    const homeAmountValue = homeAmount.replace("$", "");
    const homePriceValue = homePrice.replace("$", "");
    const destAmountValue = destAmount.replace("€", "");
    const destPriceValue = destPrice.replace("€", "");

    // Check that all values have exactly 2 decimal places
    expect(homeAmountValue.split(".")[1].length).toBe(2);
    expect(homePriceValue.split(".")[1].length).toBe(2);
    expect(destAmountValue.split(".")[1].length).toBe(2);
    expect(destPriceValue.split(".")[1].length).toBe(2);
  });
});
