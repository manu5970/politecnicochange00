document.addEventListener("DOMContentLoaded", function() {
    const convertBtn = document.getElementById("convertBtn");
    convertBtn.addEventListener("click", convertCurrency);

    async function convertCurrency() {
        const amount = document.getElementById("amount").value;
        const fromCurrency = document.getElementById("from").value;
        const toCurrency = document.getElementById("to").value;

        try {
            const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }

            const conversionRate = data.rates[toCurrency];
            const result = amount * conversionRate;
            
            document.getElementById("result").innerText = `${amount} ${fromCurrency} equivale a ${result.toFixed(2)} ${toCurrency}`;
        } catch (error) {
            console.error("Error al obtener las tasas de cambio:", error.message);
            document.getElementById("result").innerText = "Error al obtener las tasas de cambio. Por favor, inténtalo de nuevo más tarde.";
        }
    }
});