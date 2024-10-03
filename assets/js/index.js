document.addEventListener('DOMContentLoaded', getWeather);

function getWeather() {
  const city = 'Madurai';
  const apiKey = '3b757b1beb4198673da4307e8fa73c99';
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},IN&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('forecastInfo').innerText = 'City not found. Please try again.';
    });
}

function getWeatherIcon(iconCode) {
  if (iconCode.startsWith('01')) {
    return 'assets/img/sun.png';
  } else if (iconCode.startsWith('02')) {
    return 'assets/img/partly-cloudy.png';
  } else if (iconCode.startsWith('03') || iconCode.startsWith('04')) {
    return 'assets/img/cloudy.png';
  } else if (iconCode.startsWith('09') || iconCode.startsWith('10')) {
    return 'assets/img/rainy.png';
  } else if (iconCode.startsWith('11')) {
    return 'assets/img/thunderstorm.png';
  } else if (iconCode.startsWith('13')) {
    return 'assets/img/snow.png';
  } else {
    return 'assets/img/unknown.png';
  }
}

function displayWeather(data) {
  const forecastInfo = document.getElementById('forecastInfo');
  forecastInfo.innerHTML = '';

  for (let i = 0; i < data.list.length; i += 8) { // Every 8th element for 24-hour forecast
    const weather = data.list[i];
    const dayIndex = new Date(weather.dt * 1000).getDay();
    const day = getDayName(dayIndex);
    const iconCode = weather.weather[0].icon;
    const weatherIcon = getWeatherIcon(iconCode);

    const forecastItem = document.createElement('div');
    forecastItem.classList.add('forecast-item');
    forecastItem.innerHTML = `
      <h3>${day}</h3>
      <p>Temperature: ${weather.main.temp} C</p>
      <img src="${weatherIcon}" alt="Weather Icon" class="weather-icon" width:"100" height:"100">
    `;
    forecastInfo.appendChild(forecastItem);
  }
}

function getDayName(dayIndex) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayIndex];
}
