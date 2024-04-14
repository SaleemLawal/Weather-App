import { getInfo, getCoordinates, updateTimeByCity } from './api.js'
import currDate from 'date-and-time';
import moment from 'moment-timezone'

const { getDay } = require("date-fns");

let currentLocation = document.querySelector('.location').textContent.split(',')[0];
let currentTZ = null;

export default function main(location, temp){
    getInfo(location).then((data) => {
        const info = data;
        if (info['error']){
            return
        }
        updateCurrent(info, temp)
    })
}

function updateCurrent(info, temp){
    updateLocation(info.location_info)
    updateCurrentWeather(info.today_info, temp)
    weeklyTableUpdate(info.weekly_info, temp)
}

function updateLocation(location_info){
    const location = document.querySelector('.location')
    const date = document.querySelector('.date')
    location.innerHTML = `<h2 class="location">${location_info.city_name}, ${location_info.country}</h2>`
    let local_time = new Date(location_info.local_time)
    let curr = currDate.format(local_time, 'dddd, MMMM D YYYY')
    let currTime = currDate.format(local_time, 'h:mm')
    date.innerHTML = `<h3 class="date">
                        ${curr} |
                        <span class="time">${currTime}</span>
                    </h3>`
}
function updateCurrentWeather(info, temp){
    // update main weather
    document.querySelector('.weather-degree').innerHTML = 
    `<h2 class="weather-degree">${(temp === 'F') ? info.temp_f : info.temp_c}&deg;
    <span class="degree-type">${(temp === 'F') ? 'F' : 'C'}</span>
    </h2>`;

    document.querySelector('.weather-description').textContent = info.condition
    document.querySelector('.weather-detail').innerHTML = 
    `<p class="weather-detail">
        Feels like ${(temp === 'F') ? info.feelslike_f : info.feelslike_c }&deg;
        <span class="degree-type">${(temp === 'F') ? 'F' : 'C'}</span>
    </p>`

    const uv = document.getElementById('uv')
    const lastQuarterMoon = document.getElementById('last-quarter-moon')

    document.getElementById('wind').textContent = `${info.wind} m/s`
    document.getElementById('humidity').textContent = `${info.humidity}%`
    document.getElementById('visibility').textContent = `${info.visibility} km`
    document.getElementById('cloudiness').textContent = `${info.cloudiness}%`
    document.getElementById('chance-of-rain').textContent = `${info.chance_of_rain}%`
    document.getElementById('sunrise').textContent = info.sunrise
    document.getElementById('sunset').textContent = info.sunset
}

function weeklyTableUpdate(info, temp) {
    let rows = document.querySelectorAll('table tr');
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    rows.forEach((row, index) => {
        for (var i = 0; i < row.children.length; i++) {
            let className = row.children[i].getAttribute('class');
            let day = info[index].day;
            switch (className) {
                case 'day':
                    let result = getDay(new Date(info[index].date)) + 1;
                    if (result === 7) result = 0;
                    row.children[i].textContent = dayNames[result];
                    break;
                case 'highest':
                    row.children[i].textContent = `${temp === 'F' ? Math.round(day.maxtemp_f) : Math.round(day.maxtemp_c)}`;
                    break;
                case 'lowest':
                    row.children[i].textContent = `${temp === 'F' ? Math.round(day.mintemp_f) : Math.round(day.mintemp_c)}`;
                    break;
                case 'wind':
                    row.children[i].textContent = Math.round(day.maxwind_mph);
                    break;
            }
        }
    });
}


// listen for search
const search = () =>{
    const location = document.querySelector('#location-input')
    if (location.value){
        main(location.value, 'F')
    }
    

}

const form = document.getElementById('form')
form.addEventListener('submit', (event) =>{
    event.preventDefault()
    search()
    form.reset()
})

// listen for changing button to fareheint / celsius and making changes based on it

const updateTemp = (e) => {
    let currentLocation = document.querySelector('.location').textContent
    currentLocation = currentLocation.split(',')[0]
    let degreeType = e.textContent.trim().split(',')[0].split('°')[1].trim()
    main(currentLocation, degreeType)
}

document.addEventListener('click', (event)=>{
    if (event.target.matches('#celsius')) {
        updateTemp(event.target);
    } else if (event.target.matches('#farenheit')) {
        updateTemp(event.target);
    }
})

async function checkAndUpdateTime() {
    const location = document.querySelector('.location').textContent.split(',')[0];
    
    if (location !== currentLocation) {
        currentLocation = location;
        try {
            const coordinates = await getCoordinates(location);
            const [lat, long] = coordinates;
            const tz = await updateTimeByCity(lat, long);
            currentTZ = tz; 
        } catch (error) {
            console.error('Error updating time zone:', error);
            return;
        }
    }
    
    if (currentTZ) {
        updateTime(currentTZ);
    }
}

function updateTime(timeZone) {
    const date = document.querySelector('.date')
    const currDate = moment().tz(timeZone).format('dddd, MMMM D YYYY');
    const time = moment().tz(timeZone).format('h:mm');
    console.log(timeZone)
    date.innerHTML = `<h3 class="date">
                        ${currDate} |
                        <span class="time">${time}</span>
                    </h3>`
}

setInterval(checkAndUpdateTime, 30000); 

