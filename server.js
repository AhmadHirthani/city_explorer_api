'use strict';

const server = require('express');
const cors = require('cors');
require('dotenv').config();

const app = server();
app.use(cors())

const PORT = process.env.PORT || 3000


// home page
app.get('/', (request, response) => {
    response.status(200).send('this is home page');
})

app.get("/location", (req, res) => {
    const data = require("./data/location");
    console.log(data);
    const { city } = req.query;
    let locationData = new Location(city, data);
    res.status(200).send(locationData);
});


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