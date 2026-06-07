import Form from "./Components/Form/Form";
import UsersList from "./Components/Users/UsersList";
import Home from "./Components/Home/Home.jsx";


const routers = [
    {path: "/" , element :<Home/>},
    {path: "/usersList" , element: <UsersList/>},
    {path: "/loginPage" , element : <Form/>}
]


export default routers