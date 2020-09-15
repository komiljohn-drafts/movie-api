const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    },
    year: {
        type: Number,
        require: true
    },
    imdb_score: Number,
    director: mongoose.Schema.Types.ObjectId,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('movie', MovieSchema);
