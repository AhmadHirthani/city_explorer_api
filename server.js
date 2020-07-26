'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000


// home page
app.get('/', (request, response) => {
    response.status(200).send('this is home page');
})

app.get("/location", (req, res) => {
    const data = require("./data/location");
    //console.log(data);
    const city = req.query.city;
    console.log('city: ', city);
    console.log('req.query: ', req.query);

    let locationData = new Location(city, data);
    res.status(200).send(locationData);
});


app.get("/weather", (req, res, next) => {
    const weatherData = require('./data/weather.json');
    let city = req.query.city;
    const data = [];
    weatherData.data.forEach(e => {
        data.push(new Weather(city, e));
    });
    res.send(data);
})


app.listen(PORT, () => {
    console.log('server is listening to port', PORT);
})

app.all('*', (request, response) => {
    response.status(404).send('page not found');
});

function Location(city, data) {
    this.search_query = city;
    this.formatted_query = data[0].display_name;
    this.latitude = data[0].lat;
    this.longitude = data[0].lon;
}

function Weather(city, data) {
    this.forecast = data.weather.description;
    this.time = new Date(data.valid_date).toString().substr(0, 15);
}