"use client";

import { useState, useEffect } from "react";

export default function Page() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [temp, settemp] = useState("");
  const [temp_max, settemp_max] = useState("");
  const [temp_min, settemp_min] = useState("");
  const [speed, setspeed] = useState("");
  const [humidity, sethumidity] = useState("");
  const [timeText, setTimeText] = useState("");

  async function getWeather() {
    const res = await fetch(`/api/weather?city=${city}`);
    const data = await res.json();
    setCity(data.weather.name);
    setWeather(data.weather.weather[0].main);
    settemp(data.weather.main.temp);
    settemp_max(data.weather.main.temp_max);
    settemp_min(data.weather.main.temp_min);
    setspeed(data.weather.wind.speed);
    sethumidity(data.weather.main.humidity);
  }

  // ← クライアント側だけで実行されるので document 不要
  useEffect(() => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();

    setTimeText(`${month}月${day}日 ${hour}:${min}`);
  }, []);

  return (
    <div className="main">
      <input
        type="text"
        placeholder="Enter city name"
        className="border p-2 mr-3 mb-5"
        onChange={(e) => {
          setCity(e.target.value);
        }}
        value={city}
      />
      <button className="bg-gray-200 p-2" onClick={getWeather}>
        検索
      </button>
      <div className="otenki">
        <div className="content">
          <p className="time">{timeText}</p>
          <p className="basyo">{city}</p>
          <p className="tenki">{weather}</p>
          <p className="onndo">{temp} ℃</p>
          <div className="kion">
            <p className="max">{temp_max} ℃</p>
            <p className="min"> {temp_min} ℃</p>
          </div>
          <div className="sonota">
            <p className="kaze">
              風速{speed} m/s
              <span className="situdo"> 湿度{humidity} %</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
