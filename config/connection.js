const mongoose = require('mongoose')
const connection = mongoose.connect("mongodb://localhost/")

module.exports = connection;