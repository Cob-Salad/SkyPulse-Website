"use strict"
import createChart from '../src/acquisitions'

const getPoints = (latitude, longitude) => {



}

const latitude = 37.10602528367689
const longitude = -113.57639114471469

document.addEventListener("DOMContentLoaded", async () => {
    const locationResponse = await fetch(`https://api.weather.gov/points/${latitude},${longitude}`);
    const data = await locationResponse.json();
    const locationData = data["properties"]["relativeLocation"]["properties"] 
    console.log(data)

    const contentElement = document.getElementById("location")

    const locationInfo = createLocationElement(locationData) 
    contentElement.appendChild(locationInfo)


    const hourlyResponse = await fetch("https://api.weather.gov/gridpoints/SLC/20,19/forecast/hourly");
    const hourlyData = await hourlyResponse.json();
    const hourlyPeriods = hourlyData["properties"]["periods"];

    console.log(hourlyPeriods)
    const hourlyElement = document.getElementById("hourly-forecast")
    
    for (let i = 0; i < 24; i++){
        const hourlyInfo = createHourlyElement(hourlyPeriods[i])
        hourlyElement.appendChild(hourlyInfo)

    }

    const currentWeatherElement = document.getElementById("current-weather")

    const currentInfo = createCurrentWeatherElement(hourlyPeriods[0])
    currentWeatherElement.appendChild(currentInfo)


    await createChart(hourlyPeriods)

});


function createLocationElement(locationData){
    const section = document.createElement("section");
    section.className = "location"
    section.innerHTML = `<h1>${locationData["city"]}, ${locationData["state"]}</h1>`
    return section
}

function createHourlyElement (forecastData){
    const hour = forecastData["startTime"].slice(11, 16)
    const temperature = forecastData["temperature"]
    const weather = forecastData["shortForecast"]

    const period = convertTo12Hour(hour)

    const section = document.createElement("li");
    section.className = "list-group-item"
    section.innerHTML = `<li>${period}-------${temperature}&deg-------${weather}</li>`
    return section
    

}

function createCurrentWeatherElement (forecastData){
    const hour = forecastData["startTime"].slice(11, 16)
    const temperature = forecastData["temperature"]
    const weather = forecastData["shortForecast"]
    const period = convertTo12Hour(hour)

    const section = document.createElement("h3")
    section.innerHTML = `<h3>${period}-------${temperature}&deg-------${weather}</h3>` 
    return section

}

function convertTo12Hour (time24){
    let [hour, minute] = time24.split(':').map(Number);
    let period = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'
    
    return `${hour}:${minute < 10 ? '0' + minute : minute} ${period}`;
}

function makeDataSet (forecastData){
    const hour = forecastData["startTime"].slice(11, 16)
    const temp = forecastData["temperature"] 

    const period = convertTo12Hour(hour)

    const hourTemp = {hour: period, temperature: temp}
    
    return hourTemp
}



/*


function createWeatherAlerts (alertData)


*/
