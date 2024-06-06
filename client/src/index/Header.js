import React from 'react'
import { Link } from 'react-router-dom'

import { useUser } from '../Context/UserContext';

export default function Header() {

    const d = new Date();

    const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    let monthName = month[d.getMonth()];

    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = weekday[d.getDay()];

    const { user, logout } = useUser()

    return (
        <header className="w-100 p-3 mb-2 bg-info text-dark border ">
            <div>
                <h3>
                    {" "}
                    Hello! <b>{user.name}</b>...
                </h3>
                <p className="d-flex flex-row-reverse"><Link to="/" onClick={logout}>Logout</Link> </p>
                <h5 className="text-muted">
                    {" "}
                    {d.getDate()} {monthName} {d.getFullYear()}, {day}
                </h5>


            </div>

        </header>
    )
}
