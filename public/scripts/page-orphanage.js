// Map
const options = {
    dragging: false,
    touchZoom: false,
    doubleClickZoom: false,
    scrollWheelZoom: false,
    zoomControl: false
}

const lat = document.querySelector('[data-lat]').dataset.lat
const lng = document.querySelector('[data-lng]').dataset.lng

const map = L.map('mapid', options).setView([lat, lng], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

const icon = L.icon({
    iconUrl:"/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [175, 3]
})

L.marker([lat, lng], {icon}).addTo(map)


// Image gallery

function selectImage(event) {
    const currentButton = event.currentTarget

    const allButtons = document.querySelectorAll(".images button")
    allButtons.forEach((button) => {button.classList.remove("active")})

    const newImage = currentButton.children[0]
    const imageContainer = document.querySelector(".orphanage-details > img")

    imageContainer.src = newImage.src

    currentButton.classList.add("active")
}