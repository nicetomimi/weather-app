import React from "react";

const WeatherBox = ({ weather }) => {
  console.log("weather",weather)
  return (
    <div className="weather-box">
      <div>{weather?.name}</div>
      <div><img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}/></div>
      <div>
        최저{" "}
        <span className="weather-temp">
          {Math.floor(weather?.main.temp_min)}°
        </span>
        &nbsp; 최고{" "}
        <span className="weather-temp">
          {Math.floor(weather?.main.temp_max)}°
        </span>
      </div>
      <div>{weather?.weather[0].description}</div>
    </div>
  );
};

export default WeatherBox;
