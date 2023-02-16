import React, { useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { serverPostRequest } from '../../services/ServerRequest';
import { useAuthData } from '../../hooks/useAuthData'

function LogInForm({ show, onHide }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailInvalid, setEmailInvalid] = useState(false);
    const [passwordInvalid, setPasswordInvalid] = useState(false);

    const { authLogIn } = useAuthData();

    function LogInControl (a) {
        if (a.message === "Incorrect password or email") {
            setEmailInvalid(true);
            setPasswordInvalid(true);
        } else if(a.token) {
            authLogIn(a.token);
            onHide();
        } else {
            console.log(a.message)
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setEmailInvalid(false);
        setPasswordInvalid(false);
        let serwerRes = await serverPostRequest('/login', {email: email, password: password});
        await LogInControl(serwerRes);
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Log In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <InputGroup hasValidation>
                    <Form.Control type="email" placeholder="Enter email" isInvalid={emailInvalid} onChange={(event)=>setEmail(event.target.value)}/>
                    <Form.Control.Feedback type="invalid">
                        This email is not found
                    </Form.Control.Feedback> 
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" isInvalid={passwordInvalid} onChange={(event)=>setPassword(event.target.value)}/>
                    <Form.Control.Feedback type="invalid">
                        Wrong password
                    </Form.Control.Feedback> 
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}



export default LogInForm;