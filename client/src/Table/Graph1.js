import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import axios from "axios";
import dayjs from "dayjs";

export default function Graph1(props) {
  const { habitName, habitId } = useParams();
  const [data, setData] = useState([]);

  const getHabitData = useCallback(async () => {
    try {
      const habitdata = await axios.post("http://localhost:8800/habit/inputs", {
        habitId: habitId,
      });
      console.log(habitName);
      console.log(habitId);
      if (habitdata) {
        console.log("Thank you God!!!");
        const formattedData = habitdata.data.map((element) => ({
          ...element,
          date: element.date,
          inputdata: parseInt(element.input, 10),
        }));
        const sortedData = formattedData.sort((a, b) => a.date.localeCompare(b.date));
        setData(sortedData);
        console.log("data:");
        console.log(data);
      } else {
        console.log("....");
      }
    } catch (err) {
      console.log(err);
    }
  }, [habitId, habitName]);

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
        <ResponsiveContainer width="70%" height="40%" aspect={2}>
          <BarChart data={data} width={400} height={400}>
            <CartesianGrid />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="inputdata" fill="#54B4D3" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
