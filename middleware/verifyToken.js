const jwt = require('jsonwebtoken')
require("dotenv").config()
// const bycrypt = require('bcrypt')

const verifyToken = (req,res,next)=>{
const token =req.headers.authorization



if(token){
var decoded = jwt.verify(token, process.env.privateKey);
if(decoded){
    const user = decoded.user
    req.user = user
    next()
}else{
    res.send("First you need to login")
}

}else{
res.send("First you need to login")
}

}

module.exports = verifyToken

