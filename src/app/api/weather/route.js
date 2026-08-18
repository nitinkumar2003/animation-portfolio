export const dynamic = "force-dynamic";

const DEFAULT_CITY = "Noida";
const MAX_CITY_LENGTH = 80;

const json = (body, status = 200) => Response.json(body, {
  status,
  headers: {
    "Cache-Control": status === 200 ? "public, s-maxage=600, stale-while-revalidate=1200" : "no-store",
    "X-Content-Type-Options": "nosniff",
  },
});

const asCoordinate = (value, min, max) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= min && parsed <= max ? parsed : null;
};

const fetchJson = async (url) => {
  const response = await fetch(url, { next: { revalidate: 600 }, signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error(`Weather provider returned ${response.status}`);
  return response.json();
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const latitude = asCoordinate(searchParams.get("lat"), -90, 90);
  const longitude = asCoordinate(searchParams.get("lon"), -180, 180);
  const city = (searchParams.get("city") || DEFAULT_CITY).trim().slice(0, MAX_CITY_LENGTH);

  try {
    let location;
    if (latitude !== null && longitude !== null) {
      location = { name: "Current location", latitude, longitude, country: "", admin1: "" };
    } else {
      if (city.length < 2) return json({ error: "Enter at least two characters for a city." }, 400);
      const geocodeUrl = new URL("https://geocoding-api.open-meteo.com/v1/search");
      geocodeUrl.search = new URLSearchParams({ name: city, count: "1", language: "en", format: "json" }).toString();
      const geocoding = await fetchJson(geocodeUrl);
      const match = geocoding.results?.[0];
      if (!match) return json({ error: `No weather location found for ${city}.` }, 404);
      location = match;
    }

    const forecastUrl = new URL("https://api.open-meteo.com/v1/forecast");
    forecastUrl.search = new URLSearchParams({
      latitude: String(location.latitude),
      longitude: String(location.longitude),
      current: "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m",
      daily: "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max",
      timezone: "auto",
      forecast_days: "5",
    }).toString();
    const forecast = await fetchJson(forecastUrl);

    return json({
      location: {
        name: location.name,
        region: location.admin1 || "",
        country: location.country || "",
        latitude: location.latitude,
        longitude: location.longitude,
        timezone: forecast.timezone,
      },
      current: forecast.current,
      currentUnits: forecast.current_units,
      daily: forecast.daily,
      dailyUnits: forecast.daily_units,
      updatedAt: new Date().toISOString(),
    });
  } catch {
    return json({ error: "Live weather is temporarily unavailable. Please try again shortly." }, 502);
  }
}
