// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { useUser } from '../Context/UserContext';


// export default function Notes(props) {
//   const [text, setText] = useState("");

//   const { user } = useUser();

//   const saveNote = async (e) => {
//     try {
//       const userEmail = user.email;
//       console.log(userEmail)
//       const date = props.day;
//       console.log(date)
//       const note = text;
//       console.log(props.day)
//       console.log(date)
//       console.log({
//         userEmail: userEmail,
//         date: date,
//         note: note,
//       })
//       const response = await axios.post('http://localhost:8800/save/note', {
//         userEmail: userEmail,
//         date: date,
//         note: note,
//       });
//       if (response.data === "note ok") {
//         console.log('got response')
//     }
//     else {
//         console.log(response.data)
//     }
//     } catch (err) {
//       console.log("err from Notes:" + err);
//     }
//   };

//   const getNote = (async () => {
//     try {
//       const userEmail = user.email
//       const date = props.day;
//       console.log({
//         userEmail: userEmail,
//         date: date,
//       })
//       const notedata = await axios.post('http://localhost:8800/get/note', {
//         userEmail: user.email,
//         date: date,
//       });
//       if (notedata) {
//         console.log(notedata.data.note);
//         setText(notedata.data.note);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   });

//   useEffect(() => {
//     getNote();
//   }, [getNote, user]);

//   return (
//     <>
//       <textarea
//         value={text}
//         placeholder="Something about the day..."
//         onChange={(e) => {setText(e.target.value); saveNote(e)}}
//         //onBlur={saveNote}
//       />
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../Context/UserContext";

function Notes(props) {

  const { user } = useUser();
  
  const [note, setNote] = useState("");

  const saveNote = async () => {
    try {
      const response = await axios.post('http://localhost:8800/save/note', {
        userEmail: user.email,
        date: props.day,
        note: note,
      })

      console.log("Note saved:", response.data);
    } catch (error) {
      console.error("Error in saving note:", error);
    }
  };

  const getNote = async (e) =>{
    try{
      const notedata = await axios.post('http://localhost:8800/get/note',{
        userEmail: user.email,
        date: props.day
      })
      if(notedata){
        console.log("got note")
        console.log(notedata.data.note)
        setNote(notedata.data.note)
      }
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(() =>{
    getNote();
  }, [saveNote, user])

  return (
    <>
      
      <textarea
        placeholder="Note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button className="bg-secondary" onClick={saveNote}>Save Note</button>
    </>
  );
}

export default Notes;
