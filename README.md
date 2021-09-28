# Weather-Journal App Project

## Overview
This app contains server side and client side. Server side is used to fetch data from openweathermap API and client side will 
connect to server side to fetch and display weather in the front-end

## Language:
NodeJS which depends on JavaScript. This app was tested on Node 14

## Installation
Open the terminal inside the root of the app and run ````npm install````. Once dependencies get installed, run this command 
````node server.js```` this will run the application at ````http://localhost:4000```` 

## Using the app
Enter a valid US zip code like ````89106```` then enter feelings like ````happy```` then click ````generate```` button. This 
will make the app send a get request to openweathermap API to fetch the weather then display the date, temperature and 
feelings in the bottom box.