let mongoose = require("mongoose");
let Person = require('../app/models/model');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('people', () => {
    beforeEach((done) => { //Before each test we empty the database
        Person.remove({}, (err) => {
            done();
        });
    });
    /*
      * Test the /GET route
      */
    describe('/GET persons', () => {
        it('it should GET all the persons', (done) => {
            chai.request(server)
                .get('/persons')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    /*
   * Test the /POST route
   */
    describe('/POST person', () => {
        it('it should POST a person details', (done) => {
            let personDetails = {
                fullname: "My name",
                description: "Description"
            }
            chai.request(server)
                .post('/person')
                .send(personDetails)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('fullname');
                    res.body.should.have.property('description');
                    done();
                });
        });
    });



    /*
* Test the /GET/:id route
*/
    describe('/GET/:id personID', () => {
        it('it should GET a person by the given id', (done) => {
            let details = new Person({ fullname: "The Name", description: "Description" });
            details.save((err, details) => {
                chai.request(server)
                    .get('/persons/' + details.id)
                    .send(details)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('fullname');
                        res.body.should.have.property('description');
                        done();
                    });
            });

            /*
              * Test the /PUT/:id route
              */
            describe('/PUT/:id person', () => {
                it('it should UPDATE a person given the id', (done) => {
                    let book = new Person({ fullname: "The fullname", description: "test description" })
                    book.save((err, book) => {
                        chai.request(server)
                            .put('/person/' + book.id)
                            .send({ fullname: "The put fullname", description: "the put description" })
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.have.property('fullname');
                                res.body.should.have.property('description');                                
                                done();
                            });
                    });
                });

                /*
              * Delete the /Delete/:id route
              */
                describe('/DELETE/:id perosn', () => {
                    it('it should DELETE a person given the id', (done) => {
                        let book = new Person({ fullname: "The test fullname", description: "test description" })
                        book.save((err, book) => {
                            chai.request(server)
                                .delete('/person/' + book.id)
                                .end((err, res) => {
                                    res.should.have.status(200);
                                    done();
                                });
                        });
                    });
                });



            });



        });
    });


});