import React from 'react';
import { Container, Row, Col, Image, ListGroup, Button } from 'react-bootstrap';
import { collections } from '../../test/collections';

import { useAuthData } from '../../hooks/useAuthData'

const UserPage = (test) => {

    const { userData } = useAuthData();

    console.log('User page: ',userData)
    
    if (userData===null) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
        <Row className="justify-content-center">
            <Col xs={6} md={4}>
            <Image src={''} roundedCircle />
            <h2>Hello, {userData.username}</h2>
            </Col>
        </Row>
        <Row className="justify-content-center">
            <Col xs={6} md={4}>
            <h3>Collections</h3>
            <ListGroup>
                {collections.map((collection, index) => (
                <ListGroup.Item key={index}>{collection.title}</ListGroup.Item>
                ))}
            </ListGroup>
            <Button variant="primary">Create New Collection</Button>
            </Col>
        </Row>
        </Container>

    );
};

export default UserPage;
