import React from 'react'
import Form from './Components/Form/Form'
import UsersList from './Components/Users/UsersList'
import Home from './Components/Home/Home'
import { useRoutes } from 'react-router'

function App() {

    const router = useRoutes([
        { path: "/", element: <Home /> },
        { path: "/usersList", element: <UsersList /> },
        { path: "/loginPage", element: <Form /> }
    ]
    )

    return (
        <div>
            {router}
        </div>
    )
}

export default App
