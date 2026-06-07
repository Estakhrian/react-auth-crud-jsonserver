import React from 'react'
import { Link } from 'react-router'
import "./home.css"


function Home() {
  return (
    <div className='container'>
      <h2 className='text'>welcome</h2>
      <div className='btns'>
        <Link to="/loginPage" className='link'>Login page</Link>
        <Link to="/usersList" className='link'>Users list</Link>
      </div>

    </div>
  )
}

export default Home
