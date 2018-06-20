const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
// create express app
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())
app.use(cors())

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});


app.get('/', (req, res) => {
    res.json({"message": "CRUD operations"});
});

require('./app/routes/routes.js')(app);


// listen 
var server = app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});

module.exports = server
