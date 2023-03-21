import React, { useState, useEffect } from "react";
import "./App.css";

const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "0a432c36c988062d79f6b22f783c43ff";

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (!location) {
      return;
    }

    // Build the API endpoint URL with the user's location and API key
    const url = `${apiUrl}?q=${location}&appid=${apiKey}`;

    // Fetch the weather data from the API
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, [location]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const locationInput = event.target.elements.location;
    setLocation(locationInput.value);
    locationInput.value = "";
  };

  const convertKelvinToCelsius = (temp) => {
    return (temp - 273.15).toFixed(1);
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="location">Location:</label>
        <input type="text" id="location" name="location" />
        <button type="submit">Get Weather</button>
      </form>
      {data && (
        <div id="weather">
          <h2>Current Weather in {data.name}</h2>
          <p>Temperature: {convertKelvinToCelsius(data.main.temp)} °C</p>
          <p>Humidity: {data.main.humidity}%</p>
          <p>Wind Speed: {data.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
