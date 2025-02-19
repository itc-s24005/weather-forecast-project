"use client";

import { useState } from "react";

export default function Page() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [temp_max, settemp_max] = useState("");
  const [temp_min, settemp_min] = useState("");

  async function getWeather() {
    const res = await fetch(`/api/weather?city=${city}`);
    const data = await res.json();
    setCity(data.weather.name);
    setWeather(data.weather.weather[0].main);
    settemp_max(data.weather.main.temp_max);
    settemp_min(data.weather.main.temp_min);
  }

  return (
    <div className="text-center mt-8">
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

      <div className="main">
        <p className="basyo">{city}の天気</p>
        <p className="tenki">{weather}</p>
        <p className="max">{temp_max}℃</p>
        <p className="min">{temp_min}℃</p>
      </div>
    </div>
  );
}
