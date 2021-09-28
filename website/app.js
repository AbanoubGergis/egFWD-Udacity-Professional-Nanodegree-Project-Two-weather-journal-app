/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
const newDate = d.getMonth()+1 + '.' + d.getDate() + '.' + d.getFullYear();

// set openweathermap api key
const apiKey = '5c33f6436ef63440a106581db5a04b15&units=imperial';

// store the generate button in a variable
const generateBtn = document.querySelector('#generate');

// add event listener to generate button click
generateBtn.addEventListener('click', async () => {
    // change the text of the button
    generateBtn.textContent = 'Please wait ...';

    const zipCode = document.querySelector('#zip').value;
    const feelings = document.querySelector('#feelings').value;

    // check if zip code is already set and is numeric then check for feelings if set
    if (isNaN(zipCode) || zipCode.trim() === '') {
        // add error class to the zip code input
        document.querySelector('#zip').classList.add('error');
    } else if (feelings.trim() === '') {
        // add error class to the zip code input
        document.querySelector('#feelings').classList.add('error');

        // remove error class from the zip code input
        document.querySelector('#zip').classList.remove('error');
    } else {
        // remove red border of the feelings input
        document.querySelector('#feelings').classList.remove('error');

        // will get weather of the entered zip code
        const weatherData = await getWeather(zipCode);
        console.log(weatherData);
        // handle wrong zip codes
        if (weatherData.cod == '404') {
            document.querySelector('#zip').classList.add('error');
            alert('City is not found. Please enter a valid zip code');
        } else {
            document.querySelector('#zip').classList.remove('error');
            const temperature = weatherData.main.temp;

            // set projectData using post request
            await setAppWeatherData(temperature, feelings);
        }
    }

    // restore the original text of the button
    generateBtn.textContent = 'Generate';
});

async function getWeather(zipCode) {
    // set api url
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`

    // fetch data from openweathermap and return it to the event listener
    return await fetch(apiUrl)
        .then(async (responseJson) => {
            return await responseJson.json();
        })
        .catch((error) => {
            console.log(error);
        });
}

async function setAppWeatherData(temp, feelings) {
    await fetch('/setWeather', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            date: newDate,
            temp,
            feelings
        })
    }).then( async () => {
        const data = await fetch('/getWeather');
        const weatherData = await data.json();
        console.log(weatherData);

        document.querySelector('#date').innerHTML = `Date: ${newDate}`;
        // could be retrieved from weatherData also like weatherData.data

        document.querySelector('#temp').innerHTML = `Temperature: ${temp}`;
        // could be retrieved from weatherData also like weatherData.temp

        document.querySelector('#content').innerHTML = `I'm ${feelings}`;
        // could be retrieved from weatherData also like weatherData.feelings

    }).catch( (error) => {
        console.log(error);
    });

}
