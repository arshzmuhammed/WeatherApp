// whether-app//

import React, { useState } from 'react';
import './WhetherApp.css';
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import humidity_icon from "../Assets/humidity.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";

const WhetherApp = () => {
  let api_key = "56daf434a5336de5870f5f1d02460fc4";
  const [wiIcon, setWiIcon] = useState(cloud_icon)
  const search = async () => {
    console.log("Searching", wiIcon, setWiIcon)
    const element = document.getElementsByClassName('city-input');
    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${api_key}`;
    let response = await fetch(url);
    let data = await response.json();

    const humidity = document.getElementsByClassName("humidity-percentage");
    const wind = document.getElementsByClassName("wind-rate");
    const temperature = document.getElementsByClassName("wheter-temp");
    const location = document.getElementsByClassName("wheter-location");

    humidity[0].innerHTML = data.main.humidity + " %";
    wind[0].innerHTML = data.wind.speed + " km/h";
    temperature[0].innerHTML = data.main.temp + " °C";
    location[0].innerHTML = data.name;

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setWiIcon(clear_icon);
    } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
      setWiIcon(cloud_icon);
    } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
      setWiIcon(drizzle_icon);
    } else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
      setWiIcon(drizzle_icon);
    } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
      setWiIcon(rain_icon);
    } else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
      setWiIcon(rain_icon);
    } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
      setWiIcon(snow_icon);
    } else {
      setWiIcon(clear_icon);
    }

  }
  const handleClick = (e) => {
    if (e.key === "Enter") {
      search()
    }
  }

  return (
    <div className='container'>
      <div className="main">
        <div className="top-bar">
          <input type="text" className="city-input" placeholder='Search' onKeyDown={(e) => { handleClick(e) }} />
          <div className="search-icon" onClick={() => { search() }}   >
            <img src={search_icon} alt="" />
          </div>
        </div>
        <div className="whether-image">
          <img src={wiIcon} alt="" />
        </div>
        <div className="wheter-temp">24°C</div>
        <div className="wheter-location">London</div>
        <div className="data-container">
          <div className="element">
            <img src={humidity_icon} alt="" className="icons" />
            <div className="datas">
              <div className="humidity-percentage">64%</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind_icon} alt="" className="icons" />
            <div className="datas">
              <div className="wind-rate">80 km/h</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhetherApp;
