var express = require('express');
var mongoose = require('mongoose');
var gridfs = require('gridfs-stream');
var fs = require('fs');

var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


var db_filename = "pluto.jpeg";
var local_file = "./pluto.jpeg";

mongoose.connect('mongodb+srv://Martine:kanapka1@importantcluster-i8xgk.gcp.mongodb.net/test1?retryWrites=true&w=majority', { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var app = express();
gridfs.mongo = mongoose.mongo;
var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function () {

    var gfs = gridfs(connection.db);

    router.get('/', function (req, res) {
        res.send('Demo of MongoDB');
    });

    // Writing a file from local to MongoDB
    router.get('/write', function (req, res) {
        var writestream = gfs.createWriteStream({ filename: db_filename });
        fs.createReadStream(local_file).pipe(writestream);
        writestream.on('close', function (file) {
            res.send('File Created : ' + file.filename);
        });
    });

    // Reading a file from MongoDB
    router.get('/read', function (req, res) {
        // Check file exist on MongoDB
        gfs.exist({ filename: db_filename }, function (err, file) {
            if (err || !file) {
                res.send('File Not Found');
            } else {
                var readstream = gfs.createReadStream({ filename: db_filename });
                readstream.pipe(res);
            }
        });
    });

    // Delete a file from MongoDB
    router.get('/delete', function (req, res) {
        gfs.exist({ filename: db_filename }, function (err, file) {
            if (err || !file) {
                res.send('File Not Found');
            } else {
                gfs.remove({ filename: db_filename }, function (err) {
                    if (err) res.send(err);
                    res.send('File Deleted');
                });
            }
        });
    });

    // Get file information(File Meta Data) from MongoDB
    router.get('/meta', function (req, res) {
        gfs.exist({ filename: db_filename }, function (err, file) {
            if (err || !file) {
                res.send('File Not Found');
            } else {
                gfs.files.find({ filename: db_filename }).toArray(function (err, files) {
                    if (err) res.send(err);
                    var readstream = gfs.createReadStream({ filename: db_filename });
                    readstream.pipe(res);
                    // readstream.send(res)
                    // res.send(files);
                    // res.send(readstream);
                });
            }
        });
    });



});

module.exports = router;