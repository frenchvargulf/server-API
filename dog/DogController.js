// DogController.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var Dog = require('./dog');

router.post('/', function (req, res) {
    Dog.create({
            alias : req.body.alias,  
            type: req.body.type,
            breed: req.body.breed,
            size: req.body.size,
            sex: req.body.sex,
            lifeStyle: req.body.lifeStyle,
            intrests: req.body.intrests,
        }, 
        function (err, dog) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(dog);
        });
});

// RETURNS ALL THE DOGGOS IN THE DATABASE
router.get('/', function (req, res) {

    Dog.find({}, function (err, dogs) {
        if (err) return res.status(500).send("There was a problem finding dogoos.");
        res.status(200).send(dogs);
    });

});


// GETS A SINGLE PET FROM THE DATABASE
router.get('/:id', function (req, res) {

    Dog.findById(req.params.id, function (err, dog) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!dog) return res.status(404).send("No doggo found.");
        res.status(200).send(dog);
    });
});

// DELETES FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Dog.findByIdAndRemove(req.params.id, function (err, dog) {
        console.log(dog)
        if (err) return res.status(500).send("There was a problem deleting doggo.");
        res.status(200).send("Dog "+ dog +" was deleted.");
    });

});

// UPDATES A SINGLE DOGGO IN THE DATABASE
router.put('/:id', function (req, res) {
    
    Dog.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, dog) {
        console.log(dog)
        if (err) return res.status(500).send("There was a problem updating the dog.");
        res.status(200).send(dog);
        
    });

});


module.exports = router;

