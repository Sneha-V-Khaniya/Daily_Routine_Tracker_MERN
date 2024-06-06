import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function Graph0() {
  const { habitName, habitId } = useParams();
  const [data, setData] = useState([]);

  const getHabitData = useCallback(async () => {
    try {
      const habitdata = await axios.post("http://localhost:8800/habit/inputs", {
        habitId: habitId,
      });
  
      if (habitdata && Array.isArray(habitdata.data)) {
        const formattedData = habitdata.data.map((element) => ({
          ...element,
          date: element.date,
          inputdata: element.input === "true" ? 1 : 0,
        }));
  
        setData(formattedData);
      } else {
        console.log("API response is not an array or is empty.");
      }
    } catch (err) {
      console.log("Error fetching habit data:", err);
    }
  }, [habitId]);
  

  useEffect(() => {
    getHabitData();
  }, [getHabitData]);
  

  const navigate = useNavigate();

  return (
    <>
      <div>
        <p
          className="position-absolute top-0 end-0 px-5 py-3 "
          onClick={() => navigate("/home")}
        >
          <i className="fa fa-times fa-xl" aria-hidden="true"></i>
        </p>
        <h3 className="px-3 py-3">{habitName}</h3>
        {data.length > 0 ? (
          <ResponsiveContainer width="70%" height="40%" aspect={3}>
            <LineChart data={data} width={100}>
              <CartesianGrid />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line dataKey="inputdata" stroke="#54B4D3" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </>
  );
}
