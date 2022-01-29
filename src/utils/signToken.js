const jwt = require('jsonwebtoken')

module.exports = function signToken(user) {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        },
        'SECRET_KEY',
        {
            expiresIn: '30d'
        }
    )
}