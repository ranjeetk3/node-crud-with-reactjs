module.exports = (app) => {
    const person = require('../controllers/controller.js');

    // Create
    app.post('/person', person.create);

    // Retrieve
    app.get('/persons', person.findAll);
	
	 // Retrieve a single person
    app.get('/persons/:personId', person.findOne);

    // Update 
    app.put('/person/:personId', person.update);

    // Delete
    app.delete('/person/:personId', person.delete);
}