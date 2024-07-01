// Initialize the map
const map = new maplibregl.Map({
    container: 'map', // container ID
    style: 'https://api.maptiler.com/maps/streets/style.json?key=wsyYBQjqRwKnNsZrtci1', // Your style URL
    center: [ -118.444, 34.0709], // Starting position [lng, lat]
    zoom: 15 // Starting zoom level
});

// Add a marker to the map
new maplibregl.Marker()
    .setLngLat([ -118.444, 34.0709])
    .setPopup(new maplibregl.Popup({ offset: 25 }) // Add popups
        .setHTML('Math Sciences 4328 aka the Technology Sandbox<br> is the lab where I used to work in '))
    .addTo(map);