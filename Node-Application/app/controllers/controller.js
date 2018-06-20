const Person = require('../models/model.js');


// Create and Save

exports.create = (req, res) => {

    // Validate request

    if (!req.body.fullname) {

        return res.status(400).send({

            message: "Person fullname can not be empty"

        });

    }



    // Create

    const person = new Person({

        fullname: req.body.fullname || "Untitled Person",

        description: req.body.description

    });



    // Save

    person.save()

        .then(data => {

            res.send(data);

        }).catch(err => {

            res.status(500).send({

                message: err.message || "Some error occurred while creating the Person."

            });

        });

};



// Retrieve

exports.findAll = (req, res) => {

    Person.find()

        .then(persons => {

            res.send(persons);

        }).catch(err => {

            res.status(500).send({

                message: err.message || "Some error occurred while retrieving persons."

            });

        });

};



// Find a single note with a noteId
exports.findOne = (req, res) => {
    Person.findById(req.params.personId)
    .then(person => {
        if(!person) {
            return res.status(404).send({
                message: "Person not found with id " + req.params.personId
            });            
        }
        res.send(person);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Person not found with id " + req.params.personId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving person with id " + req.params.personId
        });
    });
};

// Update

exports.update = (req, res) => {

    // Validate Request

    if (!req.body.fullname) {

        return res.status(400).send({

            message: "Person fullname can not be empty"

        });

    }



    // Find person and update it with the request body

    Person.findByIdAndUpdate(req.params.personId, {

        fullname: req.body.fullname || "Untitled Person",

        description: req.body.description

    }, { new: true })

        .then(person => {

            if (!person) {

                return res.status(404).send({

                    message: "Person not found with id " + req.params.personId

                });

            }

            res.send(person);

        }).catch(err => {

            if (err.kind === 'ObjectId') {

                return res.status(404).send({

                    message: "Person not found with id " + req.params.personId

                });

            }

            return res.status(500).send({

                message: "Error updating person with id " + req.params.personId

            });

        });

};



// Delete a person

exports.delete = (req, res) => {

    Person.findByIdAndRemove(req.params.personId)

        .then(person => {

            if (!person) {

                return res.status(404).send({

                    message: "Person not found with id " + req.params.personId

                });

            }

            res.send({ message: "Person deleted successfully!" });

        }).catch(err => {

            if (err.kind === 'ObjectId' || err.name === 'NotFound') {

                return res.status(404).send({

                    message: "Person not found with id " + req.params.personId

                });

            }

            return res.status(500).send({

                message: "Could not delete person with id " + req.params.personId

            });

        });

};