const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const { authorization } = req.headers;
        if (authorization) {
            const token = authorization.slice(7, authorization.length);
            jwt.verify(token, 'SECRET_KEY', (err, decode) => {
                if (err) {
                    res.status(401).send({ message: 'Unauthorized' })
                } else {
                    req.user = decode;
                    next()
                }
            })
        } else {
            res.status(401).send({ message: 'Unauthorized' })
        }
    } catch (error) {
        res.status(401).send({ message: 'Unauthorized' })
    }
}