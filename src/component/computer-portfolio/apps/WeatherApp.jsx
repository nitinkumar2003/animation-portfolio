import React, { useEffect, useState } from "react";
import {
  FiCloud, FiCloudDrizzle, FiCloudLightning, FiCloudRain, FiCloudSnow, FiDroplet, FiMapPin,
  FiNavigation, FiRefreshCw, FiSearch, FiSun, FiSunrise, FiSunset, FiWind,
} from "react-icons/fi";

const weatherProfiles = {
  0: { label: "Clear sky", icon: FiSun },
  1: { label: "Mainly clear", icon: FiSun },
  2: { label: "Partly cloudy", icon: FiCloud },
  3: { label: "Overcast", icon: FiCloud },
  45: { label: "Fog", icon: FiCloud }, 48: { label: "Rime fog", icon: FiCloud },
  51: { label: "Light drizzle", icon: FiCloudDrizzle }, 53: { label: "Drizzle", icon: FiCloudDrizzle }, 55: { label: "Heavy drizzle", icon: FiCloudDrizzle },
  61: { label: "Light rain", icon: FiCloudRain }, 63: { label: "Rain", icon: FiCloudRain }, 65: { label: "Heavy rain", icon: FiCloudRain },
  71: { label: "Light snow", icon: FiCloudSnow }, 73: { label: "Snow", icon: FiCloudSnow }, 75: { label: "Heavy snow", icon: FiCloudSnow },
  80: { label: "Rain showers", icon: FiCloudRain }, 81: { label: "Rain showers", icon: FiCloudRain }, 82: { label: "Heavy showers", icon: FiCloudRain },
  95: { label: "Thunderstorm", icon: FiCloudLightning }, 96: { label: "Thunderstorm", icon: FiCloudLightning }, 99: { label: "Thunderstorm", icon: FiCloudLightning },
};

const getWeather = (code) => weatherProfiles[code] || { label: "Variable weather", icon: FiCloud };
const displayPlace = (location) => [location.name, location.region, location.country].filter(Boolean).join(", ");

const WeatherApp = () => {
  const [query, setQuery] = useState("Noida");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadWeather = async (params) => {
    setLoading(true); setError("");
    try {
      const response = await fetch(`/api/weather?${new URLSearchParams(params)}`);
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Weather request failed.");
      setWeather(result);
      if (result.location.name !== "Current location") setQuery(result.location.name);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadWeather({ city: "Noida" }); }, []);

  const useLocation = () => {
    if (!navigator.geolocation) { setError("Location services are not supported in this browser."); return; }
    setLoading(true); setError("");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => loadWeather({ lat: String(coords.latitude), lon: String(coords.longitude) }),
      () => { setLoading(false); setError("Location permission was not granted."); },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 },
    );
  };

  const submit = (event) => { event.preventDefault(); if (query.trim()) loadWeather({ city: query.trim() }); };
  const currentProfile = getWeather(weather?.current?.weather_code);
  const CurrentIcon = currentProfile.icon;

  return (
    <div className="nkos-weather-app">
      <header><form onSubmit={submit}><FiSearch /><input value={query} onChange={(event) => setQuery(event.target.value)} maxLength={80} placeholder="Search city" aria-label="Search city weather" /><button type="submit">Search</button></form><button type="button" onClick={useLocation} aria-label="Use current location" title="Use current location"><FiNavigation /></button><button type="button" onClick={() => loadWeather(weather?.location?.latitude ? { lat: String(weather.location.latitude), lon: String(weather.location.longitude) } : { city: query })} aria-label="Refresh weather" title="Refresh"><FiRefreshCw /></button></header>
      {loading && <div className="nkos-weather-loading"><span /><p>Updating forecast...</p></div>}
      {!loading && error && <div className="nkos-weather-error"><FiCloud /><h3>Forecast unavailable</h3><p>{error}</p><button type="button" onClick={() => loadWeather({ city: "Noida" })}>Load Noida</button></div>}
      {!loading && weather && !error && <div className="nkos-weather-content">
        <section className={`nkos-weather-now ${weather.current.is_day ? "day" : "night"}`}><div className="nkos-weather-location"><FiMapPin /><span><b>{displayPlace(weather.location)}</b><small>{weather.location.timezone}</small></span></div><div className="nkos-weather-temperature"><CurrentIcon /><span><strong>{Math.round(weather.current.temperature_2m)}°</strong><b>{currentProfile.label}</b><small>Feels like {Math.round(weather.current.apparent_temperature)}°</small></span></div><div className="nkos-weather-metrics"><span><FiDroplet /><b>{weather.current.relative_humidity_2m}%</b><small>Humidity</small></span><span><FiWind /><b>{Math.round(weather.current.wind_speed_10m)} km/h</b><small>Wind</small></span><span><FiCloudRain /><b>{weather.current.precipitation} mm</b><small>Precipitation</small></span></div></section>
        <section className="nkos-weather-forecast"><header><span>5-DAY FORECAST</span><small>Updated {new Date(weather.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</small></header><div>{weather.daily.time.map((date, index) => { const profile = getWeather(weather.daily.weather_code[index]); const Icon = profile.icon; return <article key={date}><time>{index === 0 ? "Today" : new Date(`${date}T00:00:00`).toLocaleDateString([], { weekday: "short" })}</time><Icon /><span><b>{Math.round(weather.daily.temperature_2m_max[index])}°</b><small>{Math.round(weather.daily.temperature_2m_min[index])}°</small></span><em>{weather.daily.precipitation_probability_max[index]}%</em></article>; })}</div></section>
        <section className="nkos-weather-sun"><span><FiSunrise /><small>Sunrise</small><b>{new Date(weather.daily.sunrise[0]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</b></span><i /><span><FiSunset /><small>Sunset</small><b>{new Date(weather.daily.sunset[0]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</b></span></section>
        <a className="nkos-weather-credit" href="https://open-meteo.com/" target="_blank" rel="noreferrer">Weather data by Open-Meteo</a>
      </div>}
    </div>
  );
};

export default WeatherApp;
