// Require Express to run server and routes
const express = require('express');

// Require body-parser
const bodyParser = require('body-parser');

// Require cors
const cors = require('cors');

const app = express();

/* Middleware*/

// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// set app port
const port = 4000;

// Start up an instance of app
app.listen(port, () => {
    console.log(`Server is running at: http://localhost:${port}`);
});

let projectData = {};

// routes
app.get('/getWeather', (request, response) => {
    response.send(projectData).status(200).end();
});

app.post('/setWeather', (request, response) => {
    projectData = request.body;
    console.log(projectData.temp);
    console.log(projectData.feelings);
    console.log(projectData.date);
    response.send('Weather data set successfully').status(200).end();
});
