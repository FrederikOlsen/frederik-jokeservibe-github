const express = require('express');
const app = express();
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const jokeSchema = require('../Models/jokeSchema');
const jokeController = require('../Controllers/jokeController');

/* get jokes */
app.get('/jokes', ( async(request, response) => {
    let jokes = await jokeController.getAllJokes();  
    response.send(jokes);
}));

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
    res.status(404).send('404 error (routing)');
});

module.exports = app;