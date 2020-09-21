const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(
        'mongodb+srv://user:5WLJTr3bVKgQAv7@cluster0.kunjj.mongodb.net/test',
        { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true }
    );
};

const db = mongoose.connection;
db.on('open', () => console.log('Connected to db ...'));
db.on('error', (error) => console.log('Error' + error));