# ISS Location Tracker

Track the real-time position of the International Space Station (ISS) on an interactive map.

This project tracks the position of the International Space Station (ISS) in real-time using the [Where the ISS At](https://wheretheiss.at) API and displays its location on a map.

## Features
- Real-time ISS location tracking.
- Interactive map powered by [Leaflet.js](https://leafletjs.com/).
- Custom marker for ISS representation.
- Dynamic latitude and longitude display.
- Handles API rate limits gracefully.

## Usage
1. Clone or download this repository.
2. Place all files in the same directory.
3. Open `index.html` in a browser to start tracking the ISS.

## Code Highlights

### API Handling
The project fetches ISS location data from the [Where the ISS At API](https://wheretheiss.at/v1/satellites/25544) every 15 seconds. It handles rate limits using exponential backoff and respects the `Retry-After` header if provided:

### Map and Marker
The map is rendered using Leaflet.js, with a custom icon for the ISS:

```javascript
const myIcon = L.icon({
    iconUrl: 'icon.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16],
});

let marker = L.marker([0, 0], { icon: myIcon }).addTo(map)
    .bindPopup('THE ISS')
    .openPopup();
```

### Dynamic Updates
Latitude and longitude are dynamically updated and displayed:

```javascript
lat.textContent = latitude.toFixed(2);
lon.textContent = longitude.toFixed(2);
```

## Dependencies
- [Leaflet.js](https://leafletjs.com/) for map rendering.
- OpenStreetMap tiles for the base map.

## Notes
- Ensure you have an active internet connection to fetch ISS data and map tiles.
- Avoid modifying the fetch interval to prevent exceeding the API rate limit.

## License
This project is open-source and available under the MIT License.
