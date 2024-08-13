const apiKey = "6b6bb5a31e2ad2f742885bcc";

export async function fetchConversionRate(toCurrency: string): Promise<number> {
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/pair/USD/${toCurrency}`
    );
    
    if (!response.ok) {
      throw new Error(`Error fetching conversion rate: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.conversion_rate) {
      throw new Error(`Invalid response data: ${JSON.stringify(data)}`);
    }

    return data.conversion_rate;
  } catch (error) {
    window.alert("Currency Conversion currently not working, defaulting to USD.");
    return 1
  }
}
