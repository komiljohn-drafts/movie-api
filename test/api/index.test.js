const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

const foo = 'bar';

chai.use(chaiHttp);

describe('Testing the main page', () => {
    it('Tested the main page with get method', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});
