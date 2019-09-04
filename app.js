var express = require('express');
var app = express();
var db = require('./db');
var cors = require('cors');

app.use(cors());

var UserController = require('./user/UserController');
app.use('/users', UserController);

var DogController = require('./dog/DogController');
app.use('/api/dogs', DogController);

var ImageController = require('./images/ImageController')
app.use('/api/images', ImageController);

module.exports = app;