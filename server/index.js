const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const bodyParser = require("body-parser");

const UserModel = require("./models/User");
const HabitModel = require("./models/Habit");
const InputDataModel = require("./models/InputData");
const NoteModel = require("./models/Note");

const db = require('./db')
const app = express()

app.use(cors()) 
app.use(bodyParser.json())

mongoose
    .connect(db.dbURL)
    .then(() => console.log("DB is connected"))
    .catch((err) => console.log(err));


//save new user
app.post('/signup', async (req, res) => {
    try {
        const userdata = req.body;
        userdata.activated = Date.now()
        console.log(userdata)

        if (await UserModel.findOne({ email: userdata.email }))
            res.json("account already exist on this email")
        else {
            const user = new UserModel(userdata)
            await user.save()

            res.json("user saved")
        }
    }
    catch (err) {
        console.log(err)
    }
})


//for login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email: email })
        if (user) {
            if (user.password === password) {
                res.json("success")
            }
            else {
                res.json("Incorrect password")
            }

        }
        else {
            res.json("Account does not exist...")
        }

    }
    catch (err) {
        res.json(err)
    }
})


//current user
app.post('/get/currentuser', async (req, res) => {
    const { email } = req.body;
    console.log(email);
    try {
        const currentUser = await UserModel.findOne({ email: email });
        console.log("user:", currentUser);
        res.json(currentUser);
    } catch (err) {
        res.json("Error:" + err);
    }
});


//new habit
app.post('/save/newhabit', async (req, res) => {
    try {
        const newHabit = req.body;
        console.log(newHabit)
        const habit = new HabitModel(newHabit);
        await habit.save();
        console.log("habit added.");
    } catch (err) {
        console.log(err);
    }
    console.log("here...")
});

//all habits of current user
app.post('/allhabits', async (req, res) => {
    try {
        const userEmail = req.body;
        console.log(userEmail)
        const habits = await HabitModel.find(userEmail);
        if (habits) {
            res.json(habits);
        }
    } catch (err) {
        console.log(err);
    }
});

//save data of a habit
app.post('/save/habitdata', async (req, res) => {
    try {
        const { habitId, date, input } = req.body;
        //console.log(new Date(date))
        // console.log(habitId + date + input)
        //const deleteResult = await InputDataModel.deleteOne({ habitId, date });
        const filter = { habitId: habitId, date: date };
        const update = { input: input };
        const options = { upsert: true };

        await InputDataModel.updateOne(filter, update, options);

        //const habit = new InputDataModel({ habitId, date, input });
        //await habit.save();
        console.log("habit data saved..");

    } catch (err) {
        console.log(err);
    }
});


//get data of a habit [habit][day]
app.post('/get/habitdata', async (req, res) => {
    try {
        const habit = req.body;
        console.log(habit.date);
        
        const habitdata = await InputDataModel.findOne(habit);
        res.json(habitdata);
        console.log("get habit data");
        console.log(habitdata);
    } catch (err) {
        console.log(err);
    }
});

//get all datas of a habit 
app.post('/habit/inputs', async (req, res) => {
    try {
        const habit = req.body;
        const habitdata = await InputDataModel.find(habit);
        res.json(habitdata);
        console.log("get datas of a habit:");
        console.log(habitdata);
    } catch (err) {
        console.log(err);
    }
});

app.post('/save/note', async (req, res) => {

    try {
        const notedata = req.body;
        console.log("from save note:")
        console.log(notedata); 

        const filter = { userEmail: notedata.userEmail, date: notedata.date };

        try {
            const result = await NoteModel.deleteOne(filter);
            if (result.deletedCount === 1) {
                console.log("Document deleted successfully.");
            } else {
                console.log("No document found to delete.");
            }
        } catch (error) {
            console.error("Error:", error);
        }

        const note = new NoteModel(notedata)
        const response = await note.save()
        if (response) {
            res.json("note ok");
        }
        else {
            res.json("error in saving note")
        }
        
    } catch (err) {
        console.log(err);
    }
});


//get note of a particular day
app.post('/get/note', async (req, res) => {
    try {
        const notedata = req.body;
        console.log("from get note post:")
        console.log(notedata);
        const note = await NoteModel.findOne(notedata);
        if (note) {
            res.json(note);
            console.log("get note");
            console.log(note);
        }

    } catch (err) {
        console.log(err);
    }

});

// ! fetching data befor user enter in home
// see another 

app.get('/api/get/notes', async (req, res) => {
    try {
        const notes = await NoteModel.find({});
        res.json(notes);

    } catch (err) {
        console.error(err);
    }
})

const PORT = 8800

app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}..`)
})
