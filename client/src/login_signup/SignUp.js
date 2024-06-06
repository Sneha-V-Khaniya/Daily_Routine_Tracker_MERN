import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useUser } from '../Context/UserContext';


export default function SignUp() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errmsg, setErrmsg] = useState("")

    const {signup} = useUser()

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            if (username === "" || email === "" || password === "") {
                setErrmsg("some Fields are empty.")
            }
            else {
                const response = await axios.post('http://localhost:8800/signup', { name: username, email: email, password: password })
                if (response.data === "user saved") {
                    signup({ name: username, email: email, password: password })
                    navigate('/home')
                }
                else {
                    setErrmsg(response.data)
                }
            }
        }
        catch (err) {
            setErrmsg(err)
        }
    }

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-info">
            <div className="w-25">
                <img src="https://emozzy.com/wp-content/uploads/2021/01/What-is-Life-2.jpg" className="img-fluid mw-100" alt="..." />

                <form className='bg-light p-4'>
                    <h4>Signup</h4><br />
                    <div className='mb-4'>
                        <label for="username" className="form-label">Username</label>
                        <input type="text" className='form-control' id="username"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label for="useremail" className="form-label">Email</label>
                        <input type="email" className='form-control' id="useremail"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label for="password" className="form-label">Password</label>
                        <input type="password" className='form-control' id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type='submit' className='btn btn-secondary' onClick={handleSignup}>Submit</button>
                    {errmsg === '' ? '' : <span className='text-danger'>&nbsp; {errmsg}</span>}

                    <div className='col-form-label-sm p-2'>Already have an account? <Link to="/" >Login</Link></div>
                </form>
            </div>
        </div>
    )
}
