import React, { useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { serverPostRequest } from '../../services/ServerRequest';

function RegForm({ show, onHide }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [emailInvalid, setEmailInvalid] = useState(false);
    const [usernamedInvalid, setUsernameInvalid] = useState(false);

    function RegControl (a) {
        if (a.message === "User already exists") {
            setEmailInvalid(true);
        } else if(a.message === "This username is already taken") {
            setUsernameInvalid(true);
        } else if(a.token) {
            onHide()
        } else {
            console.log(a.message)
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setEmailInvalid(false);
        setUsernameInvalid(false);
        let serwerRes = await serverPostRequest('/registration', {username: username, email: email, password: password});
        await RegControl(serwerRes);
    };

    
    return (
        <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Create New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="floatingInput">
                    <Form.Label>Enter your name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" isInvalid={usernamedInvalid} onChange={(event)=>setUsername(event.target.value)}/>
                    <Form.Control.Feedback type="invalid">
                        This name is already in use
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <InputGroup hasValidation>
                    <Form.Control type="email" placeholder="Enter email" isInvalid={emailInvalid} onChange={(event)=>setEmail(event.target.value)}/>
                    <Form.Control.Feedback type="invalid">
                        This email is already in use
                    </Form.Control.Feedback> 
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(event)=>setPassword(event.target.value)}/>
                     
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Modal.Body>
        </Modal>
    )
    

}

export default RegForm;