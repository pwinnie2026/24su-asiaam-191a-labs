// Initialize the map
const map = new maplibregl.Map({
    container: 'map', // container ID
    style: 'https://api.maptiler.com/maps/streets-v2-light/style.json?key=wsyYBQjqRwKnNsZrtci1', // Your style URL
    center: [-118.082272, 33.856938], // Starting position [lng, lat]
    zoom: 10 // Starting zoom level
});

function addMarker(lat,lng,title,message){
    let popup_message = `<h2>${title}</h2> <h3>${message}</h3>`
    let popup = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false
    }).setHTML(popup_message);

    let marker = new maplibregl.Marker()
        .setLngLat([lng, lat])
        .setPopup(new maplibregl.Popup()
            .setHTML(popup_message))
        .addTo(map)

    marker.getElement().addEventListener('mouseenter', () => {
        popup.setLngLat([lng, lat]).addTo(map);
    });
        
    marker.getElement().addEventListener('mouseleave', () => {
        popup.remove();
    });

    createButtons(lat,lng,title);
    return message
}

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // (1)! 
    newButton.id = "button"+title; // (2)! 
    newButton.innerHTML = title; // (3)! 
    newButton.setAttribute("lat",lat); // (4)! 
    newButton.setAttribute("lng",lng); // (5)! 
    newButton.addEventListener('click', function(){
        map.flyTo({
            center: [lng,lat], //(6)!
        })
    })
    document.getElementById("contents").appendChild(newButton); //(7)! 
}

addMarker(33.856938, -118.082272, "Pho Tasty", "A family favorite! But no... she's not here!")
addMarker(33.846493, -117.980919, "Martinez Nursery", "She's buying ANOTHER snake plant! At least we found her...")
addMarker(33.745125, -117.960121, "Da Vien", "You'd think... but no, try checking another spot?")