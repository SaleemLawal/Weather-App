# Weather App

## Overview
Weather App is a simple, intuitive application for fetching weather forecasts. 
This application allows users to search for weather conditions by city, providing real-time information such as temperature, humidity, wind speed, and more.

<div align="center">
  <a href="https://forecastflyer.netlify.app/">View Demo</a>
</div>


<img width="1680" alt="image" src="https://github.com/SaleemLawal/Weather-App/assets/121444852/719e0a06-0168-438d-91f2-9b99016689fd">


## Features
- **Search by City**: Enter the name of any city across the globe to receive current weather details.
- **Real-time Updates**: Fetches the most recent weather information.
- **Display Temperature**: Shows temperature in Celsius or Fahrenheit.
- **Weather Conditions**: Details about the sky conditions like sunny, cloudy, rain, etc.

## Technologies Used
- HTML
- CSS
- JavaScript
- [OpenWeatherMap API](https://openweathermap.org/api)
- [Google Maps API](https://developers.google.com/maps)
- [TimeZoneDb](https://timezonedb.com/api)

## How to Use
1. **Clone the Repository**
   ```bash
   git clone https://github.com/SaleemLawal/Weather-App.git
   ```
2. Navigate to the project directory
   ```bash
   cd Weather-App
   ```
3. Install NPM packages
  ```bash
  npm install
  ```
4. Enter your API key in ./src/apikey.js
   ```bash
   const WEATHER_API_KEY = ''
   const GOOGLE_MAP_API_KEY = ''
   const TIMEZONE_API_KEY = ''
   ```
5. Build an app
  ```bash
  npm run build
  ```

## Usage
Open ```./dist/index.html``` file with browser.

## Contribution
Contributions are welcome! If you have ideas for improvements or have found a bug, please open an issue or submit a pull request.







