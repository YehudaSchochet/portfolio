let longitude;
let latitude;

function findMyLocation() {
    if (!navigator.geolocation) {
        return;
    }
    async function success(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
    }
    function error() {
        console.log("Unable to retrieve your location");
    }
    navigator.geolocation.getCurrentPosition(success, error);
}



chrome.runtime.onInstalled.addListener(() => {
    findMyLocation();
    chrome.storage.sync.set({ longitude, latitude });
    if (longitude !== undefined && latitude !== undefined) {
        console.log(`Longitude is ${longitude}, latitude is ${latitude}`);
    } else {
        console.log("Geolocation is not supported by your browser");
    }
});