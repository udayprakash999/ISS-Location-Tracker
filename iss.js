let xshow = 0;

var map = L.map('map').setView([0, 0], 1);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


const myIcon = L.icon({
    iconUrl: 'icon.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16],
});

let marker = L.marker([0, 0], { icon: myIcon }).addTo(map)
    .bindPopup('THE ISS')
    .openPopup();

let url = 'https://api.wheretheiss.at/v1/satellites/25544';
let lat = document.getElementById("lat");
let lon = document.getElementById("lon");
let myloader = document.querySelector(".load");
let ShowLat = document.querySelector(".latitude");
let ShowLan = document.querySelector(".longitude");

let firstTime = true;
let retryDelay = 5000; 

async function getISS() {
    try {
        const response = await fetch(url);

        
        if (response.status === 429) {
            const retryAfter = response.headers.get("Retry-After"); 
            const delay = retryAfter ? parseInt(retryAfter) * 1000 : retryDelay; 
            console.warn(`Rate limit exceeded. Retrying after ${delay / 100} seconds...`);
            setTimeout(getISS, delay); 
            retryDelay = Math.min(retryDelay * 2, 6000); 
            return;
        }

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const { latitude, longitude } = data;

        if (latitude !== undefined && longitude !== undefined) {
            marker.setLatLng([latitude, longitude]);

            if (firstTime) {
                map.setView([latitude, longitude], 2);
                firstTime = false;
            }

            lat.textContent = latitude.toFixed(2);
            lon.textContent = longitude.toFixed(2);
            retryDelay = 5000; 
        } else {
            console.warn("Invalid data from API:", data);
        }
    } catch (error) {
        console.error("Error fetching ISS data:", error);
    }
}

function load() {
    
    setInterval(() => {
        getISS();
    }, 15000); 

    
    setTimeout(() => {
        myloader.style.display = "none";
        ShowLat.style.display = "block";
        ShowLan.style.display = "block";
        xshow = 1;
    }, 3500);
}

load();
