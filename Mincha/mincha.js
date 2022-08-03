(async function () {
    'use strict';

    const YOUR_TZDB_API_KEY = '6D69CAMKPGJZ';

    async function onSuccess(pos) {
        const { latitude, longitude } = pos.coords

        const timezone = await getTimezone(latitude, longitude)
        console.log(timezone);
        const zmanim = await loadZmanim(latitude, longitude, timezone.zoneName)
        console.log(zmanim.times);
        const minutesBeforeShkia = 5;
        const minutesBeforeShkiaMl = minutesBeforeShkia * 60 * 1000;

        const shkia = new Date(zmanim.times.sunset);
        const adjustedShkia = new Date(shkia.getTime() - minutesBeforeShkiaMl);

        setInterval(() => {
            const now = new Date();
            if (now === adjustedShkia) {
                alert('Time for Mincha');
            }
        }, 1000);
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(onSuccess, error);

    //take long and lat and return the timezone 
    async function getTimezone(latitude, longitude) {
        try {
            const response = await fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=${YOUR_TZDB_API_KEY}&format=json&by=position&lat=${latitude}&lng=${longitude}`);
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            return await response.json();

        } catch (status) {
            console.error('OOPS Error', status);
        }
    }
    //loads the zmanim 
    async function loadZmanim(latitude, longitude, timezone) {
        try {
            const response = await fetch(`https://www.hebcal.com/zmanim?cfg=json&latitude=${latitude}&longitude=${longitude}&tzid=${timezone}`);
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            return await response.json();

        } catch (error) {
            console.error('OOPS Error', error);
        }
    }
})();


// alert('Time for Mincha')
