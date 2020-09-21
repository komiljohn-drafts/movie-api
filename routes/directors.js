const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Directors = require('../model/Directors');

// list all directors
router.get('/', (req, res, next) => {
    Directors.find({},
        (err, data) => {
            if (err) console.log(err);
            res.json(data);
        });
});

// creating a new director
router.post('/', (req, res, next) => {
    const director = new Directors(req.body);

    const promise = director.save();
    promise.
        then(data => res.json(data))
        .catch(err => {
            console.log(err);
        });
});

// getting a director
router.get('/:director_id', (req, res, next) => {
    const promise = Directors.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(req.params.director_id) } },
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'Favourites'
            }
        },
        { $unwind: { path: '$Favourites' } },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                Favourites: {
                    $push: '$Favourites'
                }
            }
        }
    ]);
    promise.then((data) => res.json(data))
        .catch(err => console.log(err));
});

// updating a director with new info
router.post('/:director_id', (req, res, next) => {
    const promise = Directors.findByIdAndUpdate(req.params.director_id, req.body);
    promise.then((data) => res.json(data))
        .catch(err => console.log(err));
});

// deleting a director
router.delete('/:director_id', (req, res, next) => {
    const promise = Directors.findByIdAndUpdate(req.params.director_id, req.body);
    promise.then((data) => res.json(data))
        .catch(err => console.log(err));
});

// director's top movies
router.get('/:director_id/top2', (req, res, next) => {
    const promise = Directors.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(req.params.director_id) } },
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'Favourites'
            }
        },
        { $unwind: { path: '$Favourites' } },
        { $sort: { 'Favourites.imdb_score': -1 } },
        { $limit: 2 },
        { $group: { _id: { _id: '$_id' }, Favourites: { $push: '$Favourites' } } },
        { $project: { _id: 0, Favourites: 1 } }
    ]);
    promise.then((data) => res.json(data))
        .catch(err => console.log(err));
});

module.exports = router;