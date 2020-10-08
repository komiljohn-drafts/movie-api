var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../model/Users');

router.get('/', (req, res, next) => {
    res.send('main page');
});

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

// Generating token
router.post('/authenticate', (req, res, next) => {
    const { username, password } = req.body;
    Users.findOne({ username }, (err, user) => {
        if (err) throw err;
        if (!user) {
            res.json({
                status: 401,
                message: 'User hasn\'t authorized'
            });
        } else {
            bcrypt.compare(password, user.password).then((result) => {
                if (!result) {
                    res.json({
                        status: "Your password is wrong",
                        message: 'Message: wrong password'
                    });
                } else {
                    const payload = { username };
                    const token = jwt.sign(payload, req.app.get('jwtPrivateKey'), {
                        expiresIn: 720
                    });
                    res.json({ status: 200, token });
                }
            });

        }
    });
});

module.exports = router;