(async function () {
    'use strict';

    function geoFindMe() {
        if (!navigator.geolocation) {
            console.log("Geolocation is not supported by your browser");
            return;
        }
        async function success(position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            console.log(latitude, longitude);
           console.log(await reverseGeocode(longitude, latitude)); 
        }
        function error() {
            console.log("Unable to retrieve your location");
        }
        navigator.geolocation.getCurrentPosition(success, error);
    }

    async function reverseGeocode(latitude, longitude) {
        try {
            const response = await fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=tlWV2N335ajVxYGwHIzrcQ6gaWB6jsPV&location=${latitude},${longitude}&includeNearestIntersection=true`);
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            return await response.json();

        } catch (status) {
            console.error('OOPS Error', error);
        }
    }

    async function loadZmanim() {
        try {
            const response = await fetch('https://www.hebcal.com/zmanim?cfg=json&zip=08701');
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            return await response.json();

        } catch (error) {
            console.error('OOPS Error', error);
        }
    }

    geoFindMe();
    
    const minutesBeforeShkia = 5;
    const minutesBeforeShkiaMl = minutesBeforeShkia * 60 * 1000;
    const zmanim = await loadZmanim();

    const shkia = new Date(zmanim.times.sunset);
    const adjustedShkia = new Date(shkia.getTime() - minutesBeforeShkiaMl);

    setInterval(() => {
        const now = new Date();
        if (now === adjustedShkia) {
            console.log('now is bigger', now);
        }
    }, 1000);


})();


// alert('Time for Mincha')
