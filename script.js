function updateSyst() {
    const hour = Math.floor(Math.random() * 24);
    const temp = Math.floor(Math.random() * 20) + 21;
    const actemp = Math.floor(Math.random() * 12) + 18;

    const time = document.getElementById('time');
    time.textContent = `${hour}:00`;

    const weather = document.getElementById('weather');
    weather.textContent = `${temp}°C`;

    const lightStatus = document.getElementById('lightStatus');
    const acStatus = document.getElementById('acStatus');

    if (hour >= 20 || hour < 6) {
        lightStatus.textContent = 'Lights: Off';
    } else {
        lightStatus.textContent = 'Lights: On';
    }

    if (temp < 30) {
        acStatus.textContent = `${actemp}°C AC: Off`;
    } else {
        if (actemp < 25) { 
            acStatus.textContent = `${actemp}°C Your AC's cold enough! Turning it down...`;
        } else { 
            acStatus.textContent = `${actemp}°C AC: On`;
        }
    }
}
