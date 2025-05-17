import React, { useState } from 'react';

const apiKeys = "2c44eb4ea5ade92d08e106527e2dd31c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const weatherIcons = {
    Clouds: "/images/clouds.png",
    Clear: "/images/clear.png",
    Rain: "/images/rain.png",
    Snow: "/images/snow.png",
    Mist: "/images/mist.png",
    Drizzle: "/images/drizzle.png",
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city) return;
    try {
      const response = await fetch(apiUrl + city + `&appid=${apiKeys}`);
      if (response.status === 404) {
        setError("Invalid City Name");
        setWeather(null);
      } else {
        const data = await response.json();
        setWeather(data);
        setError("");
      }
    } catch (err) {
      setError("Something went wrong");
      setWeather(null);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100" style={{backgroundColor: 'midnightblue'}}>
      <div className="card p-4" style={{maxWidth: 470, width: '100%', borderRadius: 20, backgroundImage: 'linear-gradient(135deg,skyblue,rgb(42, 42, 247))'}}>
        <form className="search d-flex mb-3" onSubmit={handleSearch}>
          <input
            type="text"
            className="form-control me-2"
            placeholder="Enter the city name:"
            value={city}
            onChange={e => setCity(e.target.value)}
            spellCheck={false}
            style={{height: 60, borderRadius: 30, fontSize: 18}}
          />
          <button type="submit" className="btn p-0" style={{borderRadius: '50%', height: 60, width: 60, backgroundColor: '#ebfffc'}}>
            <img src="/images/search.png" alt="search" style={{width: 16}} />
          </button>
        </form>
        {error && (
          <div className="error alert alert-danger py-2 px-3" style={{display: 'block', fontSize: 14}}>
            <p className="mb-0">{error}</p>
          </div>
        )}
        {weather && (
          <div className="weather" style={{display: 'block'}}>
            <img src={weatherIcons[weather.weather[0].main] || "/images/clear.png"} className="weather-icon mb-3" alt="weather icon" />
            <h1 className="temp">{Math.round(weather.main.temp)}°C</h1>
            <h2 className="city">{weather.name}</h2>
            <div className="more-details d-flex justify-content-between align-items-center mt-4 mb-3 px-3">
              <div className="d-flex align-items-center">
                <img src="/images/humidity.png" alt="humidity" style={{width: 40, marginRight: 10}} />
                <div>
                  <p className="humiditys mb-0">{weather.main.humidity}%</p>
                  <p className="mb-0">Humidity</p>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <img src="/images/wind.png" alt="wind" style={{width: 40, marginRight: 10}} />
                <div>
                  <p className="winds mb-0">{weather.wind.speed}Km/hr</p>
                  <p className="mb-0">Wind</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
