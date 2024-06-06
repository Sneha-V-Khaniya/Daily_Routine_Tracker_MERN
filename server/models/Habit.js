const mongoose = require('mongoose')

const HabitSchema = new mongoose.Schema({
    userEmail: String,
    habitName: String,
    habitType: String,

})

const HabitModel = mongoose.model("habits", HabitSchema)
module.exports = HabitModel