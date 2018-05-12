const should = require('should');
const supertest = require('supertest');

const api = supertest.agent('http://localhost:3000');

describe('Plans route Unit Testing', () => {

    it('should return response status 200, with a json response', (done) => {
        api.get('/api/plans')
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(200, done);
      });

    it('should return object type response', (done) => {
        api.get('/api/plans')
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, res) => {
                res.body.should.type('object');
                done();
              });
      });

    it('should return string for _id type response', (done) => {
        api.get('/api/plans')
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, res) => {
                res.body[0]._id.should.type('string');
                done();
              });
      });

    it('should return number for value', (done) => {
        api.get('/api/plans')
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, res) => {
                res.body[0].value.should.type('number');
                done();
              });
      });

    it('should return string type for text', (done) => {
        api.get('/api/plans')
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, res) => {
                res.body[0].text.should.type('string');
                done();
              });
      });

    it('should return number type for tax', (done) => {
        api.get('/api/plans')
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, res) => {
                res.body[0].tax.should.type('number');
                done();
              });
      });

  });
