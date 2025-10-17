const form = document.getElementById("weatherForm");
const input = document.getElementById("locationInput");
const resultCard = document.getElementById("weatherResult");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const icon = document.getElementById("weatherIcon");

const API_KEY = "2da629af1238416ca8275107251710";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const location = input.value.trim();
  if (!location) return;

  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=yes`
    );
    
    if (!response.ok) throw new Error("Location not found");

    const data = await response.json();

    cityName.textContent = `${data.location.name}, ${data.location.country}`;
    temperature.textContent = `🌡️ ${data.current.temp_c}°C`;
    condition.textContent = `☁️ ${data.current.condition.text}`;
    icon.src = data.current.condition.icon;

    resultCard.classList.remove("hidden");
  } catch (err) {
    alert("Error fetching weather. Please check location name.");
    resultCard.classList.add("hidden");
  }
});
