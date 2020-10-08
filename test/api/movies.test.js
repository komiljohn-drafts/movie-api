const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

// testing all the movies
describe('api movies', () => {
    before((done) => {
        chai
            .request(server)
            .post('/authenticate')
            .send({ username: 'Xolmurod', password: 'password' })
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });

    describe('Testing api movies', () => {
        it('Testing the movies api movies with get method', (done) => {
            chai
                .request(server)
                .get('/api/movies')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array'); // in which should be data
                    done();
                });
        });

    });

    describe('testing creating a movie with post method', () => {
        it('Creating a movie with post method into api/movies', (done) => {
            const movie = {
                title: 'Temir Xotin',
                category: 'Comedy',
                year: 1995,
                country: 'Uzbekistan',
                director_id: '5f6387e93fe1b319c8786d6d',
                imdb_score: 8.5
            };
            chai
                .request(server)
                .post('/api/movies')
                .send(movie)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('category');
                    res.body.should.have.property('year');
                    res.body.should.have.property('country');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('imdb_score');
                    movieId = res.body._id;
                    done();
                });
        });
    });

    // it('Tested the main page with get method', (done) => {
    //     chai.request(server)
    //         .post('/api/movies')
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             done();
    //         });
    // });
});
