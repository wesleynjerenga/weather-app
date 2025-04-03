const weatherform = document.querySelector(".weatherform");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "0343652aefbe76e555a4456d519eb729";

weatherform.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = cityInput.value;

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError("Could not fetch weather data. Please check the city name and try again.");
        }
    } else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    return data;
}

function displayWeatherInfo(data) {
    card.textContent = ""; // Clear previous content
    card.style.display = "flex";

    const cityName = document.createElement("h2");
    cityName.textContent = `Weather in ${data.name}`;

    const temperature = document.createElement("p");
    temperature.textContent = `Temperature: ${(data.main.temp - 273.15).toFixed(1)}°C`;

    const description = document.createElement("p");
    description.textContent = `Description: ${data.weather[0].description}`;

    card.appendChild(cityName);
    card.appendChild(temperature);
    card.appendChild(description);
}

function getWeatherEmoji(weatherId){

}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDispaly");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}