import React from 'react'
import { useNavigate } from 'react-router'

import Type0 from "./Type0"
import Type1 from "./Type1"
import Type2 from "./Type2"
import Notes from './Notes'

export default function Habits({ habits }) {

  const navigate = useNavigate()

  function getMonday() {
    const today = new Date();
    const currentDay = today.getDay();
    const daysUntilMonday = currentDay === 0 ? 1 : 1 - currentDay; // Adjust for Sunday
    today.setDate(today.getDate() + daysUntilMonday);
    return today;
  }

  const monday = getMonday();
  const weekDates = [];

  for (let i = 0; i < 7; i++) {
    // Iterate for 7 days (Monday to Sunday)
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed, so add 1
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${day}-${month}-${year}`;
    weekDates.push(formattedDate);
  }

  const days = ["Mon", "Tue", "Wed", "Thus", "Fri", "Sat", "Sun"];

  return (
    <>
      <div className="table-responsive">
        <table className="table">
          <thead className="table-secondary">
            <tr>
              <th>Your Habits</th>
              {weekDates.map((date, index) => (
                <th key={index}>
                  <strong>{date}</strong>
                  <div>{days[index]}</div>
                </th>
              ))}
              
            </tr>
          </thead>

          <tbody>
            {habits.map((habit) => (
              <tr key={habit._id}>
                <td>
                  <strong>{habit.habitName}</strong>
                  <br />
                  <i
                    className="fa-solid fa-square-poll-vertical fa-2xl p-4"
                    onClick={() =>
                      navigate(
                        `/graph${habit.habitType}/${habit.habitName}/${habit._id}`
                      )
                    }
                  ></i>
                </td>
                {(() => {
                  switch (habit.habitType) {
                    case "0":
                      return (
                        <>
                          <Type0 day={weekDates[0]} id={habit._id} />
                          <Type0 day={weekDates[1]} id={habit._id} />
                          <Type0 day={weekDates[2]} id={habit._id} />
                          <Type0 day={weekDates[3]} id={habit._id} />
                          <Type0 day={weekDates[4]} id={habit._id} />
                          <Type0 day={weekDates[5]} id={habit._id} />
                          <Type0 day={weekDates[6]} id={habit._id} />
                        </>
                      );
                    case "1":
                      return (
                        <>
                          <td>
                            <Type1 day={weekDates[0]} id={habit._id} />
                          </td>
                          <td>
                            <Type1 day={weekDates[1]} id={habit._id} />
                          </td>
                          <td>
                            <Type1 day={weekDates[2]} id={habit._id} />
                          </td>
                          <td>
                            <Type1 day={weekDates[3]} id={habit._id} />
                          </td>
                          <td>
                            <Type1 day={weekDates[4]} id={habit._id} />
                          </td>
                          <td>
                            <Type1 day={weekDates[5]} id={habit._id} />
                          </td>
                          <td>
                            <Type1 day={weekDates[6]} id={habit._id} />
                          </td>
                        </>
                      );
                    case "2":
                      return (
                        <>
                          <td>
                            <Type2 day={weekDates[0]} id={habit._id} />
                          </td>
                          <td>
                            <Type2 day={weekDates[1]} id={habit._id} />
                          </td>
                          <td>
                            <Type2 day={weekDates[2]} id={habit._id} />
                          </td>
                          <td>
                            <Type2 day={weekDates[3]} id={habit._id} />
                          </td>
                          <td>
                            <Type2 day={weekDates[4]} id={habit._id} />
                          </td>
                          <td>
                            <Type2 day={weekDates[5]} id={habit._id} />
                          </td>
                          <td>
                            <Type2 day={weekDates[6]} id={habit._id} />
                          </td>
                        </>
                      );
                    default:
                      return <></>;
                  }
                })()}
              </tr>
            ))}
            <tr>
              <td></td>
              <td>
                <Notes day={weekDates[0]} />
              </td>
              <td>
                <Notes day={weekDates[1]} />
              </td>
              <td>
                <Notes day={weekDates[2]} />
              </td>
              <td>
                <Notes day={weekDates[3]} />
              </td>
              <td>
                <Notes day={weekDates[4]} />
              </td>
              <td>
                <Notes day={weekDates[5]} />
              </td>
              <td>
                <Notes day={weekDates[6]} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
