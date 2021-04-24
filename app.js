const express = require('express');
const hbs = require('hbs');
const jokeRouter = require('./Routers/jokeRouter');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const handlebars = require('handlebars');
const jokeController = require('./Controllers/jokeController');
const indexhbs = require('./Views/index');
const fs = require('fs');
const { collection } = require('./Models/jokeSchema');
const { createJoke } = require('./Controllers/jokeController');
const { urlencoded } = require('body-parser');
const port = process.env.PORT || 5700;
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'hbs');
app.set('views', './Jokeservice/Views');
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));




/* Mongoose connection */
const MONGODB_URI = 'mongodb+srv://fred:admin@dumb-jokes-services.woyzv.mongodb.net/test';
mongoose.connect(MONGODB_URI || 'mongodb://localhost/JokeDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('connected', () => {
    console.log('mongoose is connected!');

});

//Retrieve data from the database
app.get('/', async (req, res) => {
    const aljoke = await jokeController.getAllJokes();
    const jokeData = {
        "jokeIterator" : aljoke
    }
    console.log(aljoke);

    // read the file and use the callback to render
    fs.readFile('Jokeservice/Views/index.hbs', function (err, data) {
        if (!err) {
            // make the buffer into a string
            var templateStringify = data.toString();
            // call the render function
            var template = handlebars.compile(templateStringify);
            res.send(template(jokeData));    
        } else {
            // handle file read error
            console.log(err);
            res.status(500).send("Error 500: couldn't read template file");
        }
    })
});

//Send data TO the database
app.post('/', (req, res) => {

    collection.insertOne(
        {setUp: req.body.inputSet,
        punchLine: req.body.inputPunch}
        );
});

app.listen(port, () => {

    console.log('Listening on port: ' + port);
})


module.exports.app = app;