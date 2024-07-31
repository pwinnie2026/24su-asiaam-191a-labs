let mapOptions = {'centerLngLat': [-118.444,34.0709],'startingZoomLevel':5}

const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/streets-v2-light/style.json?key=wsyYBQjqRwKnNsZrtci1',
    center: mapOptions.centerLngLat,
    zoom: mapOptions.startingZoomLevel
});

function addMarker(data){
    let longitude = data['lng']
    let latitude = data['lat'];
    let vaccinationLocation = data['Where did you get vaccinated?'];
    let homeZipcode = data['What zip code do you live in?'];
    let vaccinationStatus = data['Have you been vaccinated?']
    
    let category = vaccinationStatus == "Yes" ? "vaccinated" : "notVaccinated";
    let popup_message;
    if (vaccinationStatus == "Yes"){
        popup_message = `<h2>Vaccinated</h2> <h3>Location: ${vaccinationLocation}</h3> <p>Zip Code: ${homeZipcode}</p>`
    }
    else{
        popup_message = `<h2>Not Vaccinated</h2><p>Zip Code: ${homeZipcode}</p>`
    }

    const newMarkerElement = document.createElement('div');


    newMarkerElement.className = `marker marker-${category}`;


    new maplibregl.Marker({element:newMarkerElement})
        .setLngLat([longitude, latitude])
        .setPopup(new maplibregl.Popup()
            .setHTML(popup_message))
        .addTo(map)
    createButtons(latitude,longitude,vaccinationLocation);
}

function createButtons(lat,lng,title){
    if (!title){
        return;
    }
    const newButton = document.createElement("button");
    newButton.id = "button"+title; 
    newButton.innerHTML = title;
    newButton.setAttribute("lat",lat);
    newButton.setAttribute("lng",lng);
    newButton.addEventListener('click', function(){
        map.flyTo({
            center: [lng,lat],
        })
    })
    document.getElementById("contents").appendChild(newButton);
}

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSNq8_prhrSwK3CnY2pPptqMyGvc23Ckc5MCuGMMKljW-dDy6yq6j7XAT4m6GG69CISbD6kfBF0-ypS/pub?output=csv"

map.on('load', function() {
    createFilterUI();
    Papa.parse(dataUrl, {
        download: true,
        header: true,
        complete: function(results) {
            processData(results.data);
        }
    });
});

function processData(results){
    console.log(results) //for debugging: this can help us see if the results are what we want
    results.forEach(feature => {
        addMarker(feature);
    });
};

function createCheckboxForCategory(category, filterGroup) {
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'auto auto 1fr';
    container.style.alignItems = 'center';
    container.style.gap = '8px';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = category;
    input.checked = true;

    const label = document.createElement('label');
    label.setAttribute('for', category);
    label.textContent = category;

    const markerLegend = document.createElement('div');
    markerLegend.className = `marker marker-${category}`;

    container.appendChild(input);
    container.appendChild(label);
    container.prepend(markerLegend);

    filterGroup.appendChild(container);

    input.addEventListener('change', function(event) {
        toggleMarkersVisibility(category, event.target.checked);
    });
}

function createFilterUI() {
    const categories = ['vaccinated', 'notVaccinated'];
    const filterGroup = document.getElementById('filter-group') || document.createElement('div');
    filterGroup.setAttribute('id', 'filter-group');
    filterGroup.className = 'filter-group';

    document.getElementById("legend").appendChild(filterGroup);

    categories.forEach(category => {
        createCheckboxForCategory(category, filterGroup);
    });
}

function toggleMarkersVisibility(category, isVisible) {
    const markers = document.querySelectorAll(`.marker-${category}`);
    markers.forEach(marker => {
        marker.style.display = isVisible ? '' : 'none';
    });
}