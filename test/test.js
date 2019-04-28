//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
let app = require('../server');
let postgres = require("pg-promise");
var db = require('../api/queries');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe("Objets", () => {
    describe("GET /", () => {
        // Test to get all students record
        it("should get welcome msg", (done) => {
             chai.request(app)
                 .get('/')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.status.should.equal('success');
                     res.body.should.have.property('message');
                     res.body.should.have.property('message').length;
                    //  expect(res.body.message).to.include(2); 
                   
                     done();
                  });
         });
        // Test to get objects record
        it("should get objects record", (done) => {
            //  const id = 1;
             chai.request(app)
                 .get(`/api/userobject`)
                 .end((err, res) => {
                     res.should.have.status(200);
                    //  res.body.should.not.be.a('object');
                    res.body.status.should.equal('success');
                    console.log(res.body);
                    
                     done();
                  });
         });
         
        // Test to get single object record
        it("should get a single student record", (done) => {
             const id = 70;
             chai.request(app)
                 .get(`/api/userobject/${id}`)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.status.should.equal('success');
                     done();
                  });
         });


        //  it('should return the list of articles', async () => {
        //     let response = await chai.request(app).get('/api/userobject');
        //     chai.expect(response).to.have.status(200);
        //     chai.expect(response.data).to.not.be.null;
        // });

        it('should  delete one details', async () => {
            let id = 71;
            let response = await chai.request(app).delete('/api/userobject/'+id);
            console.log(response.body);
            chai.expect(response).to.have.status(200);
            chai.expect(response.data).to.not.be.null;
        });

        // it('get single details from database', async () => {
        //     // let id = 63;
        //     var id = parseInt(63);
        //     let response = db.singleObjectDetails(id);
        //     console.log(response.body);
        //     // chai.expect(response).to.have.status(200);
        //     // chai.expect(response.data).to.not.be.null;
        // });
    
    });


});