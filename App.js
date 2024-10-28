function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

const coordinates = [];
for (let i = 0; i < 3; i++) {
    const latitude = getRandomInRange(30, 35, 3);
    const longitude = getRandomInRange(-100, -90, 3);
    coordinates.push({ latitude, longitude });
}

// US Centering 
const map = L.map('map').setView([32.5, -95], 5); 

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

async function getLoc(lat, lon) {
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
    const data = await response.json();
    return data.locality || "Locality not found";
}

const markersInfoDiv = document.getElementById('markers-info');
coordinates.forEach((coord, index) => {
    const marker = L.marker([coord.latitude, coord.longitude]).addTo(map);
    const markerInfo = document.createElement('div');
    markerInfo.className = 'marker-info';
    markerInfo.innerHTML = `Marker ${index + 1}: <strong>(${coord.latitude.toFixed(3)}, ${coord.longitude.toFixed(3)})</strong>`;
    
    getLoc(coord.latitude, coord.longitude).then(locality => {
        markerInfo.innerHTML += `<br>Locality: ${locality}`;
    });

    markersInfoDiv.appendChild(markerInfo);
});
