// Initialize the map
const map = new maplibregl.Map({
    container: 'map', // container ID
    style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', // Your style URL
    center: [96.913707, 20.562050], // Starting position [lng, lat]
    zoom: 9 // Starting zoom level
});

// Add a marker to the map
new maplibregl.Marker()
    .setLngLat([96.913707, 20.562050])
    .setPopup(new maplibregl.Popup({ offset: 25 }) // Add popups
        .setHTML('<h3>Inle Lake, Myanmar</h2><br><p>I visited here with my family almost 10 years ago. (Note! You are in Myanmar (Asia)! Scroll right to see my other markers in the US!)</p>'))
    .addTo(map);

// Add a marker to the map
new maplibregl.Marker()
    .setLngLat([-77.00468020584017, 38.88856576879683])
    .setPopup(new maplibregl.Popup({ offset: 25 }) // Add popups
        .setHTML('<h3>Capitol Hill, DC, USA</h2><br><p>I was able to lobby with SWE@UCLA this May! It was a really cool experience, and we ate some really good food.</p>'))
    .addTo(map);

// Add a marker to the map
new maplibregl.Marker()
    .setLngLat([-111.826171, 34.901524])
    .setPopup(new maplibregl.Popup({ offset: 25 }) // Add popups
        .setHTML('<h3>Sedona, AZ, USA</h2><br><p>My family loves to hike and travel in the Southwest, and Arizona/Utah are two of our favorite states to visit the scenery!</p>'))
    .addTo(map);