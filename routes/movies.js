var express = require('express');
var router = express.Router();

const Movies = require('../model/Movies');

// list of all movies
router.get('/', (req, res, next) => {
    Movies.find({}, (err, data) => {
        if (err) console.log(err);
        res.json(data);
    });
});

// creating a new movie
router.post('/', (req, res, next) => {
    const { title, category, year, director, imdb_score } = req.body;

    // const movie = new Movies({
    //     title: title,
    //     category: category,
    //     year: year,
    //     director: director,
    //     imdb_score: imdb_score
    // });

    const movie = new Movies(req.body);

    const promise = movie.save();

    promise.then((data) => {
        res.json(data);
    }).catch(err => console.log(err));
});

// getting a movie by id
router.get('/:movie_id', (req, res, next) => {
    Movies.findById(req.params.movie_id, (err, data) => {
        if (err) console.log(err);
        res.json(data);
    }).select({ title: 1, _id: 0 });
});

// updating a movie with a new info
router.put('/:movie_id', (req, res, next) => {
    Movies.update(
        { _id: req.params.movie_id },
        // updating parameter and it's value
        { imdb_score: 8.5 },
        (err, data) => {
            if (err) console.log(err);
            res.json(data);
        }
    );
});

// deleting a movie
router.delete('/:movie_id', (req, res, next) => {
    Movies.findById(req.params.movie_id, (err, movie) => {
        movie.remove((err, data) => {
            res.json(data);
        });
    });
});

// showing top 10 movies
router.get('/top10', (req, res, next) => {
    Movies.find({}, (err, data) => {
        if (err) console.log(err);
        res.json(data);
    })
        .sort({ 'imdb_score': -1 })
        .limit(10);
});

// movies between two dates
router.get('/between/:start_year/:end_year', (req, res, next) => {
    Movies.find({
        year: { $gt: req.params.start_year, $lt: req.params.end_year }
    },
        (err, data) => {
            if (err) console.log(err);
            res.json(data);
        }).select({ title: 1, _id: 0 });
});

module.exports = router;