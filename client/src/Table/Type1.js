import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";


export default function Type1(props) {
  
  const [duration, setDuration] = useState();
  const changeDuration = (e) => {
    setDuration(e.target.value);
  };

  
  const getData = useCallback(async () => {
    try {
      const habitId = props.id;
      const date = props.day;
      let habitdata = await axios.post("http://localhost:8800/get/habitdata", {
        habitId,
        date,
      });

      console.log("Server response:", habitdata.data); 

      if (habitdata.data) {
        console.log(habitdata.data);
        setDuration(habitdata.data.input);

        
      }
    } catch (error) {
      console.error("Error fetching habit data:", error);
    }
  }, [props.id, props.day]);

  const handleData = async (e) => {
    let habitId = props.id;
    let date = props.day;
    console.log(date);
    let input = (e.target.value).toString();

    console.log(input)

    await axios.post("http://localhost:8800/save/habitdata", {
      habitId,
      date,
      input,
    });

    
  };

  useEffect(() => {
    getData();
  }, [getData]);


  return (
    <>
      <input
        type="number"
        value={duration}
        onChange={changeDuration}
        onBlur={handleData}
        placeholder="00"
      ></input><p>mins</p>
    </>
  );
}
