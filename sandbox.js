async function getData() {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=-6.2&longitude=106.816666
&current_weather=true&hourly=relativehumidity_2m,windspeed_10m&timezone=auto`
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}

console.log(getData());