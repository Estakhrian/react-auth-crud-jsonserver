import React, { useState } from 'react'
import "./form.css"
import axios from 'axios'
import { Link } from 'react-router'


function Form() {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")


    const registerhandler = async (event) => {
        event.preventDefault()

        const newUser = {
            firstName,
            lastName,
            email
        }
        if (firstName && lastName && email) {
            await axios.post("http://localhost:3001/users",
                newUser
            )

            setFirstName("")
            setLastName("")
            setEmail("")
        }



    }

    return (
        <div className='form-container'>
            <form className='form' onSubmit={registerhandler}>
                <input
                    className='form-field'
                    type='text'
                    placeholder='firstname...'
                    name='firstname'
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value.trim())} />
                <input
                    className='form-field'
                    type='text'
                    placeholder='lastname...'
                    name='lastname'
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value.trim())} />
                <input
                    className='form-field'
                    type='email'
                    placeholder='email...'
                    name='email'
                    value={email}
                    onChange={(event) => setEmail(event.target.value.trim())} />

                <button className='form-btn form-field' type='submit'>Register</button>
            </form>
            <Link to="/usersList" className='userslist-btn'>userslist</Link>
        </div>
    )
}

export default Form
