const mongoose = require("mongoose");
const url = require("url")
let connectionString = 'mongodb+srv://Pawansays:lpu@11708503@cluster0.3bebrmt.mongodb.net/?retryWrites=true&w=majority'

let uri = url.parse(connectionString).href
module.exports = uri

