import {WEATHER_API_KEY, GOOGLE_MAP_API_KEY, TIMEZONE_API_KEY} from './apikey'
export async function getInfo(city) {
    const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${city}&days=8&aqi=no&alerts=no`
    
    try {
        const response = await fetch(API_URL, {mode: 'cors'});

        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }

        const weather_info = await response.json();

        if (!weather_info || !weather_info.location || !weather_info.forecast) {
            throw new Error('Incomplete data returned from API');
        }

        const location_info = LocationInfo(weather_info['location']);
        const today_info = current(weather_info);
        const weekly_info = parseInput(weather_info.forecast.forecastday);

        return {
            location_info, today_info, weekly_info
        };
    } catch (error) {
        console.error('An error occurred while fetching the weather information:', error);

        return { error: error.message };
    }
}


function LocationInfo(info){

    return {
        'city_name': info.name, 
        'country': info.country, 
        'local_time': info.localtime
    }
}
function current(weather_info){
    const current_weather_info = weather_info.current
    const current_additional_info = weather_info.forecast.forecastday[0]
    return {
        'temp_f': Math.round(current_weather_info.temp_f),
        'temp_c': Math.round(current_weather_info.temp_c),
        'condition': current_weather_info.condition.text,
        'icon': current_weather_info.condition.icon,
        'wind': current_weather_info.wind_mph,
        'uv': current_weather_info.uv,
        'humidity': current_weather_info.humidity,
        'visibility': current_weather_info.vis_miles,
        'feelslike_c': Math.round(current_weather_info.feelslike_c),
        'feelslike_f': Math.round(current_weather_info.feelslike_f),
        'cloudiness': current_weather_info.cloud,
        'chance_of_rain': current_additional_info.day.daily_chance_of_rain,
        'sunrise': current_additional_info.astro.sunrise,
        'sunset': current_additional_info.astro.sunset,
        'Last_quarter_Moon': current_additional_info.astro.moon_phase,
    }
}

function parseInput(info_list){
    return info_list.splice(1)
}

export async function getCoordinates(city) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city)}&key=${GOOGLE_MAP_API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === 'OK') {
            const coordinates = data.results[0].geometry.location;
            return [coordinates.lat, coordinates.lng];
        } else {
            console.error('Geocoding failed:', data.status);
            return null;
        }
    } catch (error) {
        console.error('Failed to fetch coordinates:', error);
        return null;
    }
}
export async function updateTimeByCity(lat, lng) {
    const url = `http://api.timezonedb.com/v2.1/get-time-zone?key=${TIMEZONE_API_KEY}&format=json&by=position&lat=${lat}&lng=${lng}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const timeZone = data.zoneName; 
        return timeZone  
    } catch (error) {
        console.error('Failed to get time zone', error);
    }
}