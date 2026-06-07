import React, { useState, useEffect } from 'react'
import axios from 'axios';
import "./userslist.css"
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';


function UsersList() {

    const [users, setUsers] = useState([])
    const [selectUser, setSelectUser] = useState("")
    const [userId, setUserId] = useState("")
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [newFirstName, setNewFirstName] = useState("")
    const [newLastName, setNewLastName] = useState("")
    const [newEmail, setNewEmail] = useState("")



    useEffect(() => {
        const getUsers = async () => {
            const response = await axios.get("http://localhost:3001/users")

            setUsers(response.data)
        }

        getUsers()
    }, [])


    useEffect(() => {

        let mainUserInfos = users.find((user) => user.id == userId)

        if (mainUserInfos) {
            setNewFirstName(mainUserInfos.firstName)
            setNewLastName(mainUserInfos.lastName)
            setNewEmail(mainUserInfos.email)
        }

    }, [userId])



    const removeHandler = async () => {

        await axios.delete(`http://localhost:3001/users/${userId}`)

        setUsers(prevState => prevState.filter(user => user.id !== userId))

        setShowDeleteModal(false)

    }

    const editHandler = async () => {

        const newUserEdited = {
            firstName: newFirstName,
            lastName: newLastName,
            email: newEmail
        }

        if (newFirstName && newLastName && newEmail) {

            await axios.put(`http://localhost:3001/users/${userId}`, newUserEdited)

            const getUsers = async () => {

                const response = await axios.get("http://localhost:3001/users")

                setUsers(response.data)
            }

            getUsers()

            setShowEditModal(false)
        }

    }


    return (
        <>
            {users.length === 0 ? (
                <h2>There are no users in the list</h2>
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td className="actions-td" >
                                    <button
                                        className='actions-btn'
                                        onClick={() => {
                                            setShowDeleteModal(true)
                                            setUserId(user.id)
                                            setSelectUser(`${user.firstName} ${user.lastName}`)
                                        }}>
                                        <AiFillDelete />
                                    </button>
                                    <button
                                        className='actions-btn'
                                        onClick={() => {
                                            setShowEditModal(true)
                                            setUserId(user.id)
                                        }}>
                                        <AiFillEdit />
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {/*delete modal */}
            <Modal
                show={showDeleteModal}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Delete User !
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Are you sure for delete "{selectUser}"?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowDeleteModal(false)}>Close</Button>
                    <Button onClick={() => removeHandler()}>Yes, Delete</Button>
                </Modal.Footer>
            </Modal>

            {/*edit modal */}
            <Modal
                show={showEditModal}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit user
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-1" controlId="formBasicEmail">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter new first name"
                                onChange={(event) => setNewFirstName(event.target.value.trim())}
                                value={newFirstName} />
                        </Form.Group>

                        <Form.Group className="mb-1" controlId="formBasicEmail">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter new last name"
                                onChange={(event) => setNewLastName(event.target.value.trim())}
                                value={newLastName} />
                        </Form.Group>

                        <Form.Group className="mb-1" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter new Email"
                                onChange={(event) => setNewEmail(event.target.value)}
                                value={newEmail} />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowEditModal(false)}>Close</Button>
                    <Button onClick={() => editHandler()}>Edit</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UsersList

