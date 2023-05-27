export function convertTimezoneToDateTime(offsetSeconds) {
  const ofssetOnHours = offsetSeconds / 60 / 60;
  const now = new Date();
  const hours = String(now.getUTCHours()).padStart(2, "0");
  const minutes = String(now.getUTCMinutes()).padStart(2, "0");
  let right_hour = parseInt(hours) + ofssetOnHours;
  right_hour = right_hour % 24;
  const gmtTime = `${parseInt(right_hour)}:${minutes}`;

  return gmtTime;
}

export function calculateSunRiseOver(sunriseTimestamp, sunsetTimestamp) {
  const currentTime = Math.floor(Date.now() / 1000); // Current time in UNIX timestamp

  const daylightDuration = sunsetTimestamp - sunriseTimestamp;

  const elapsedTime = currentTime - sunriseTimestamp;

  const percentage = (elapsedTime / daylightDuration) * 100;

  const roundedPercentage = Math.round(percentage * 100) / 100;
  if (roundedPercentage > 100 || roundedPercentage < 0) return 100;
  return roundedPercentage;
}

export function convertKelvinToCelsius(kelvin) {
  return parseFloat(kelvin - 273.15).toFixed(1);
}
