const apiKey = 'c22b5f9be653678c2595b41be111d259'; 
// Replace with your OpenWeatherMap API key

// komment
// bujin

async function getWeather() {
    const cityInput = document.getElementById('cityInput').value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        document.getElementById('error-message').textContent = ''; // Clear previous errors

        // Display city name, local time, description, and temperature
        document.getElementById('city').textContent = data.name;
        const timezoneOffset = data.timezone; // Timezone offset in seconds
        const localTime = new Date((Date.now() + timezoneOffset * 1000));
        const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        document.getElementById('time').textContent = localTime.toLocaleTimeString('en-US', options);
        document.getElementById('temperature').textContent = data.main.temp;
        document.getElementById('description').textContent = data.weather[0].description;

        // Display high and low temperatures
        document.getElementById('highest').textContent = data.main.temp_max;
        document.getElementById('lowest').textContent = data.main.temp_min;

        // Change box background based on weather description
        const weatherDescription = data.weather[0].main.toLowerCase();
        const weatherBox = document.querySelector('.weather');

        switch (weatherDescription) {
            case 'clear':
                weatherBox.style.backgroundColor = '#4a90e2'; // Light blue for clear skies
                break;
            case 'clouds':
                weatherBox.style.backgroundColor = '#95a5a6'; // Gray for cloudy weather
                break;
            case 'rain':
                weatherBox.style.backgroundColor = '#34495e'; // Dark gray for rain
                break;
            case 'snow':
                weatherBox.style.backgroundColor = '#ecf0f1'; // Light white for snow
                weatherBox.style.color = '#000'; // Switch to dark text for contrast
                break;
            case 'thunderstorm':
                weatherBox.style.backgroundColor = '#2c3e50'; // Darker gray for thunderstorm
                break;
            case 'drizzle':
                weatherBox.style.backgroundColor = '#7f8c8d'; // Light gray for drizzle
                break;
            case 'mist':
                weatherBox.style.backgroundColor = '#bdc3c7'; // Foggy color
                break;
            default:
                weatherBox.style.backgroundColor = '#1e1e1e'; // Default dark background for unknown conditions
        }
    } catch (error) {
        document.getElementById('error-message').textContent = error.message;
    }
}

//sagnkjaskdhgjsdgalk
