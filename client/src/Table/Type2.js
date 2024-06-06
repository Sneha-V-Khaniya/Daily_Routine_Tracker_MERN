
import React, { useState, useCallback, useEffect } from "react";
import { TimePicker } from "react-ios-time-picker";
import axios from "axios";

function Type2(props) {
  const [time, setTime] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const changeTime = (timeValue) => {
    setTime(timeValue);
    saveData(timeValue);
  };

  const getData = useCallback(async () => {
    try {
      setIsLoading(true);
      let habitId = props.id;
      let date = props.day;
      let habitdata = await axios.post("http://localhost:8800/get/habitdata", {
        habitId,
        date,
      });
      if (habitdata.data && habitdata.data.input) {
        setTime(habitdata.data.input);
      }
    } catch (error) {
      console.error("Error fetching habit data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [props.id, props.day]);

  const saveData = async (newTime) => {
    try {
      let habitId = props.id;
      let date = props.day;
      let input = newTime.toString();

      await axios.post("http://localhost:8800/save/habitdata", {
        habitId,
        date,
        input,
      });
    } catch (error) {
      console.error("Error saving habit data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <TimePicker onChange={changeTime} value={time} />
          
        </>
      )}
    </>
  );
}

export default Type2;
