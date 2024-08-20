const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).send('Access Denied: No token provided');
    }

    token = token.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.privateKey);
        req.user = decoded.user;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).send('Token Expired: Please login again');
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(403).send('Invalid Token: Authorization denied');
        } else {
            return res.status(500).send('Internal Server Error');
        }
    }
};

module.exports = verifyToken;
