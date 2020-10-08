const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.body.token || req.query.token;

    if (token) {
        jwt.verify(token, req.app.get('jwtPrivateKey'), (err, decoded) => {
            if (err) {
                res.json({
                    status: false,
                    message: 'Token xato, check again'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    }
};