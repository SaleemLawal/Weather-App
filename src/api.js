export async function getInfo(city) {
    var KEY = '8f4fe7cb5d17453c94914346243103'
    const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${city}&days=8&aqi=no&alerts=no`
    const response = await fetch(API_URL, {mode: 'cors'})
    const weather_info = await response.json()
    const location_info = LocationInfo(weather_info['location'])
    const today_info = current(weather_info)
    const weekly_info = parseInput(weather_info.forecast.forecastday)
    return {
        location_info, today_info, weekly_info
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
        'temp_f': current_weather_info.temp_f,
        'temp_c': current_weather_info.temp_c,
        'condition': current_weather_info.condition.text,
        'icon': current_weather_info.condition.icon,
        'wind_mph': current_weather_info.wind_mph,
        'uv': current_weather_info.uv,
        'humidity': current_weather_info.humidity,
        'vis_miles': current_weather_info.vis_miles,
        'feelslike_c': current_weather_info.feelslike_c,
        'feelslike_f': current_weather_info.feelslike_f,
        'cloudiness': current_weather_info.cloud,
        'chance_of_rain': current_additional_info.day.daily_chance_of_rain,
        'sunrise': current_additional_info.astro.sunrise,
        'sunset': current_additional_info.astro.sunset,
        'moon_phase': current_additional_info.astro.moon_phase,
    }
}

function parseInput(info_list){
    return info_list.splice(1)
}

