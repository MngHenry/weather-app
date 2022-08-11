import React, { useState, useEffect } from "react";
import "./App.css";

const api = {
  key: "24a50225c459b3b6b8cafba62baedc58",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return;
      setLoading(true);
      try {
        const url = `${api.base}weather?q=${searchCity}&appid=${api.key}`;
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          //{data.name} - {data.sys.country} - {data.weather.description} - {data.main.pressure} - {data.main.humidity}
          // setWeatherInfo(JSON.stringify(data));
          setWeatherInfo(
            `City: ${data.name} - Country: ${data.sys.country} - Weather: ${data.weather[0].main} - Description: ${data.weather[0].description} - Humidity: ${data.main.humidity}%`
          );
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetchWeatherData();
  }, [searchCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };
  const Heading = () => <h1> hello! </h1>;
  return (
    <div className="container">
      <h1>Weather app</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="City"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <button>Search</button>
      </form>
      {loading ? (
        <div>loading...</div>
      ) : (
        <>
          {errorMessage ? (
            <div style={{ color: "red" }}>{errorMessage}</div>
          ) : (
            <div>{weatherInfo}</div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
