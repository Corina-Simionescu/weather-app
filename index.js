// 17b3bcffdfda47dfa92173733232912
const input = document.querySelector("input");

async function getData(cityName)
{
    const response = await fetch("https://api.weatherapi.com/v1/current.json?key=17b3bcffdfda47dfa92173733232912&q=" + cityName);
    const data = await response.json();
    try
    {
        return {
            temperatureCelsius: data.current.temp_c,
            realCityName: data.location.name
        }
    }
    catch (error)
    {
        console.error("Error fetching data: ", error);
        throw error;
    }

}

input.addEventListener("keydown", async (event) =>
{
    if (event.code === "Enter")
    {
        event.preventDefault();
        const cityName = input.value;
        const output = document.querySelector(".output-container");
        try
        {
            if (cityName)
            {
                const wheatherInfo = await getData(cityName);
                const temperature = document.querySelector(".temperature");
                const city = document.querySelector(".city");

                output.style.display = "flex";
                temperature.innerHTML = wheatherInfo.temperatureCelsius + " &#8451";
                city.innerHTML = wheatherInfo.realCityName;
            }
        }
        catch (error)
        {
            console.error("Error processing weather data: ", error);
            output.style.display = "none";
        }
        finally
        {
            input.value = "";
        }
    }
})