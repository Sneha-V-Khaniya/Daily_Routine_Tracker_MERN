import axios from 'axios';
import React,{ useEffect, useRef, useState, useCallback } from 'react'


export default function Type0(props) {
  const complete = "complete" + props.day + props.id;
  const notcomplete = "notcomplete" + props.day + props.id;
  const groupId = "group" + props.day + props.id; // Unique group identifier

  const inputElementComplete = useRef("");
  const inputElementNotComplete = useRef("");
  const inputEle = useRef("");

  const [habitvalue, setHabitvalue] = useState('');

  const changebgColor = (e) => {
    if (e.target.id === complete) {
      console.log(groupId);
      inputEle.current.style.backgroundColor = "#008000";
      
    } else if (e.target.id === notcomplete) {
      inputEle.current.style.backgroundColor = "#ff0000";
    }
    
    handleData(e);
    
  };


  const handleData = async(e) =>{
    let habitId = props.id;
    
    let date = props.day;
    let input = e.target.value;
    
    await axios.post('http://localhost:8800/save/habitdata',{habitId, date, input});
    
  }

  
  const habitHandler = useCallback(() => {
    console.log(habitvalue)
    if(habitvalue === "true"){
      inputEle.current.style.backgroundColor = "#008000";
      inputElementComplete.current.checked = true;
    
    }
    else if(habitvalue === "false"){
      inputEle.current.style.backgroundColor = "#ff0000";
      inputElementNotComplete.current.checked = true;
    }
    else{
      inputEle.current.style.backgroundColor = "#ffffff";
    }
  }, [habitvalue])

  const getData = useCallback(async () => {
    try {
      const habitId = props.id;
      const date = props.day;
      const habitdata = await axios.post('http://localhost:8800/get/habitdata', { habitId, date });
      
      console.log("Server response:", habitdata.data); 
      
      if (habitdata.data) {
        console.log(habitdata.data);
        setHabitvalue(habitdata.data.input);
        
        // Rest of your code to handle habitdata
      }
    } catch (error) {
      console.error("Error fetching habit data:", error);
    }
    habitHandler();
  }, [props.id, props.day, habitHandler]);


  useEffect(() =>{
    getData();
    // habitHandler();
  }, [getData])

  return (
    <>
      <td ref={inputEle}>
      <div >
        <input ref={inputElementComplete}
          type="radio"
          name={groupId} 
          id={complete}
          onClick={changebgColor}
          value="true"
        />
        <label htmlFor={complete}>
          <i className="fa-regular fa-circle-check fa-xl p-1" aria-hidden="true"></i>
        </label>
        <p className="m-3"></p>
      </div>
      <div >
        <input ref={inputElementNotComplete}
          type="radio"
          name={groupId} 
          id={notcomplete}
          onClick={changebgColor}
          value="false"
        />
        <label htmlFor={notcomplete}>
          <i className="fa-regular fa-circle-xmark fa-xl p-1"></i>
        </label>
      </div>
    </td>
    </>
  )
}
