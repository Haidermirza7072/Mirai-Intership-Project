document.addEventListener("DOMContentLoaded", () => {

  document.getElementById('getWeatherBtn').addEventListener('click', async () => {

    const city = document.getElementById('cityInput').value.trim();
    if (!city) {
      alert("Please enter a city name");
      return;
    }

    document.getElementById('temp').innerText = "Loading...";
    document.getElementById('humidity').innerText = "";
    document.getElementById('aqi').innerText = "";

    // Tumhari OpenWeatherMap API key
    const apiKey = "09d27218d8b4946f6e27e97ac2e137bf";

    try {
      // 1) Current Weather
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      if (!weatherRes.ok) throw new Error("City not found");
      const weatherData = await weatherRes.json();

      const temp = weatherData.main.temp;
      const humidity = weatherData.main.humidity;
      const lat = weatherData.coord.lat;
      const lon = weatherData.coord.lon;

      document.getElementById('temp').innerText = `🌡️ Temperature: ${temp}°C`;
      document.getElementById('humidity').innerText = `💧 Humidity: ${humidity}%`;

      // 2) AQI (Air Pollution)
      const aqiRes = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      const aqiData = await aqiRes.json();
      const aqiValue = aqiData.list[0].main.aqi;

      document.getElementById('aqi').innerText = `🌫️ AQI: ${aqiValue}`;

    } catch (error) {
      console.error(error);
      alert("Error fetching weather");
      document.getElementById('temp').innerText = "";
      document.getElementById('humidity').innerText = "";
      document.getElementById('aqi').innerText = "";
    }

  });

});
