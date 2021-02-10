// Map
const map = L.map('mapid').setView([-30.26,-50.512], 16.5);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);


const icon = L.icon({
    iconUrl:"/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68]
})


let marker;

map.on('click', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;

    marker && map.removeLayer(marker);

    marker = L.marker([lat, lng], {icon}).addTo(map)
})


// Photos
function addPhotoField() {
    const container = document.querySelector('#images')
    const lastField = document.querySelectorAll('.new-upload')

    const newUpload = lastField[lastField.length - 1].cloneNode(true)

    const input = newUpload.children[0]
    if(input.value == "") {return}

    input.value = ""

    container.appendChild(newUpload)
}

function deletePhotoField(event) {
    const span = event.currentTarget

    const lastField = document.querySelectorAll('.new-upload')
    if(lastField.length < 2) {
        span.parentNode.children[0].value = ""
        return
    }

    span.parentNode.remove()
}


// Yes or not
function toggleSelect(event) {
    document.querySelectorAll('.button-select button')
    .forEach((button) => button.classList.remove('active'))

    const selected = event.currentTarget
    selected.classList.add('active')

    const input = document.querySelector('[name="open-on-weekends"]')
    input.value = selected.dataset.value
}


// Map validation

function validate(event) {
    const pointInMap = document.querySelector('[name="lat"]').value

    if (pointInMap == '') {
        event.preventDefault()
        alert('Selecione um ponto no mapa')
    }
}