// weather.js

// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#caption-desc');

// Define API URL
const url = 'https://api.openweathermap.org/data/2.5/weather';

// Define API key and coordinates
const apiKey = 'ccd5563da126656b282cadea81ef3910';
const latitude = '29.882802866112275';
const longitude = '-97.79299267726698';
const units = 'imperial';

// Define API URL with parameters
const apiUrl = `${url}?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

// Function to fetch data from API
async function apiFetch() {
    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Function to display results in HTML
function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp.toFixed(0)}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    desc = desc.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    weatherIcon.setAttribute('src', iconsrc);
    captionDesc.textContent = `${desc}`;
    
    // Fetch 3-day forecast
    fetchForecast();
    
    // Update wind chill
    updateWindChill(); // Call updateWindChill function after updating temperature and wind speed
}

// Function to fetch 3-day forecast
async function fetchForecast() {
    const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
    const forecastApiUrl = `${forecastUrl}?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
    try {
        const response = await fetch(forecastApiUrl);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            throw new Error(`Failed to fetch forecast data: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error fetching forecast data:', error);
    }
}

// Function to display 3-day forecast
function displayForecast(data) {
    const forecastData = data.list;
    // Display forecast for the next three days
    for (let i = 0; i < 3; i++) {
        const forecastDate = new Date(forecastData[i * 8].dt * 1000); // Access data for every 24 hours (8 data points per day)
        const dayOfWeek = forecastDate.toLocaleDateString('en-US', { weekday: 'long' }); // Get day of the week
        const dateOfMonth = forecastDate.toLocaleDateString('en-US', { day: 'numeric' }); // Get date of the month
        const forecastTemp = forecastData[i * 8].main.temp.toFixed(0); // Access temperature for the middle of the day
        document.getElementById(`day${i+1}-temp`).textContent = `${dayOfWeek} ${dateOfMonth}: ${forecastTemp} °F`;
    }
}

// Function to calculate wind chill
function calculateWindChill(temperature, windSpeed) {
    if (temperature <= 50 && windSpeed > 3.0) {
        var windChill = Math.round(35.74 + (0.6215 * temperature) - (35.75 * Math.pow(windSpeed, 0.16)) + (0.4275 * temperature * Math.pow(windSpeed, 0.16)));
        return windChill;
    } else {
        return "N/A";
    }
}

// Function to update wind chill on the webpage
function updateWindChill() {
    // Retrieve temperature and wind speed elements from the HTML
    var temperature = parseFloat(document.getElementById('current-temp').innerText);
    var windSpeed = parseFloat(document.getElementById('windSpeed').innerText);
    
    // Calculate wind chill
    var windChill = calculateWindChill(temperature, windSpeed);
    
    // Update wind chill element on the webpage
    document.getElementById('windChill').innerText = windChill;
}

// Invoke API fetch function
apiFetch();

// JavaScript for last modified date
document.getElementById('lastModified').textContent = new Date(document.lastModified).toLocaleString();