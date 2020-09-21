var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');

const Users = require('../model/Users');

router.post('/', (req, res, next) => {
    const { username, password } = req.body;

    bcrypt.hash(password, 1, (err, hash) => {
        const user = new Users({
            username,
            password: hash
        });

        const promise = user.save();
        promise
            .then((data) => res.json(data))
            .catch((err) => console.log(err));
    });
});

module.exports = router;