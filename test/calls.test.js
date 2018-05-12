const should = require('should');
const supertest = require('supertest');

const api = supertest.agent('http://localhost:3000');

describe('Calls route Unit Testing', () => {

    it('should return response status 200, with a json response', (done) => {
        api.get('/api/calls')
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(200, done);
      });

    it('should return object type response', (done) => {
        api.get('/api/calls')
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, res) => {
                res.body.should.type('object');
                done();
              });
      });

    it('should return string for _id type response', (done) => {
        api.get('/api/calls')
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, res) => {
                res.body[0]._id.should.type('string');
                done();
              });
      });

    it('should return number for dddOrigin type response', (done) => {
        api.get('/api/calls')
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, res) => {
                res.body[0].dddOrigin.should.type('number');
                done();
              });
      });

    it('should return object type for dddDestinations', (done) => {
        api.get('/api/calls')
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, res) => {
                res.body[0].dddDestinations.should.type('object');
                done();
              });
      });

    it('should return number for ddd in dddDestinations', (done) => {
        api.get('/api/calls')
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, res) => {
                res.body[0].dddDestinations[0].ddd.should.type('number');
                done();
              });
      });

    it('should return number for pricePerMinute in dddDestinations', (done) => {
        api.get('/api/calls')
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, res) => {
                res.body[0].dddDestinations[0].pricePerMinute.should.type('number');
                done();
              });
      });
  });
