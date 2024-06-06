const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({

    userEmail: String,
    date: String,
    note: String
})

const NoteModel = mongoose.model("notes", NoteSchema)
module.exports = NoteModel