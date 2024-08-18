const mongoose = require('mongoose')
const connection = mongoose.connect(process.env.mongoURL)
console.log("Db is connected")
module.exports= connection