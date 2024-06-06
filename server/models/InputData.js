const mongoose = require('mongoose')

const InputDataSchema = new mongoose.Schema({
    habitId: String,
    date: String,
    input: String,

})

const InputDataModel = mongoose.model("inputdatas", InputDataSchema)
module.exports = InputDataModel