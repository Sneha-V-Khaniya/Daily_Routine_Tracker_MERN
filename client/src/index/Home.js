import React, {useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Header from './Header'

import axios from 'axios'
import { useUser } from '../Context/UserContext'
import Habits from '../Table/Habits'

export default function Home() {

    const {user} = useUser()

    const [show, setShow] = useState(false);
    
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [habitname, setHabitname] = useState("")
    const [habittype, setHabittype] = useState("")

    const handleSave = async () => {
        
        console.log(user.email)
        try {
            console.log("fetching...")
            await axios.post('http://localhost:8800/save/newhabit', { userEmail: user.email, habitName: habitname, habitType: habittype })
            console.log("ok done.")
            
        }
        catch (err) {
            console.log("from NewHabit" + err);
        }


        setShow(false)
    }


    const [habits, setHabits] = useState([]);

    async function fetchData() {
        console.log(user)
        console.log("something")
        
        console.log(user.email);

        const response = await axios.post('http://localhost:8800/allhabits', { userEmail: user.email });

        setHabits(response.data)
        console.log(response.data)
        console.log(`habits: ${response.data}`);
    }

    useEffect(() => {
        fetchData();
    }, [show])

    return (
        <>
            <Header />

            <Button variant="dark" onClick={handleShow}>
                <i className="fa-solid fa-plus"> </i>Add Habit
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>My New Habit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="habit name"
                                name='habitname'
                                onChange={(e) => setHabitname(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>

                        {['radio'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                                <Form.Check
                                    inline
                                    label="done/ not done type"
                                    name="group1"
                                    type={type}
                                    id='0'
                                    onClick={(e) => { setHabittype(e.target.id) }}
                                />
                                <br />
                                <Form.Check
                                    inline
                                    label="durational type"
                                    name="group1"
                                    type={type}
                                    id='1'
                                    onClick={(e) => { setHabittype(e.target.id) }}
                                />
                                <br />
                                <Form.Check
                                    inline
                                    label="at point of time type"
                                    name="group1"
                                    type={type}
                                    id='2'
                                    onClick={(e) => { setHabittype(e.target.id) }}
                                />
                            </div>
                        ))}

                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            <br /><br />

            <Habits habits = {habits}/>
        </>
    )
}
