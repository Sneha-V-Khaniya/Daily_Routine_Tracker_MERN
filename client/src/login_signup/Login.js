import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useUser } from '../Context/UserContext'
export default function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [errmsg, setErrmsg] = useState("")

    const {login} = useUser()

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if (email === "" || password === "") {
                setErrmsg("some Fields are empty.")
            }
            else {
                const user = await axios.post('http://localhost:8800/login', { email, password })
                if (user.data === "success") {
                    login({email: email, password: password })
                    navigate("/home")
                }
                else {
                    setErrmsg(user.data)
                }
            }
        } catch (err) {
            setErrmsg(err)
        }
    }

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-info">
            <div className="w-25">
                <img src="https://emozzy.com/wp-content/uploads/2021/01/What-is-Life-2.jpg" className="img-fluid mw-100" alt="..." />


                <form className='bg-light p-4'>
                    <h4>Login</h4><br />

                    <div className='mb-4'>
                        <label for="useremail" className="form-label">Email</label>
                        <input type="email" className='form-control' id="useremail" required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='mb-4'>
                        <label for="password" className="form-label">Password</label>
                        <input type="password" className='form-control' id="password" required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type='submit' className='btn btn-secondary' onClick={handleLogin}>Submit</button>
                    {errmsg === "" ? "" : <span className='text-danger'>&nbsp; {errmsg}</span>}

                    <div className='col-form-label-sm p-2'> Not have an account?<Link to="/signup">SignUp</Link></div>
                </form>
            </div>
        </div>
    )
}
