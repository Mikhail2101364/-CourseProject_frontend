import React from 'react';
import { useLoaderData } from 'react-router-dom';
import {Container, Alert} from 'react-bootstrap';

function MainPage (props) {
    const {name} = useLoaderData()

    return(
        <Container>
            <Alert variant='info'>Hello, {name}!</Alert>
        </Container>
    )
    
}

export default MainPage;