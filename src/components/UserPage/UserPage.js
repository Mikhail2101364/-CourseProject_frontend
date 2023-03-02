import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import defaultAvatar from '../../pictures/defaultAvatar.png';
import { useAuthData } from '../../hooks/useAuthData'
import { serverJWTRequest } from '../../services/ServerRequest';
import './custom_style_UserPage.css'

const UserPage = () => {

    const { userData } = useAuthData();
    const [collections, setCollections] = useState(null);

    useEffect(() => {
        async function fetchCollections() {
            const data = await serverJWTRequest('/collections/user');
            setCollections(data)
        }
        fetchCollections();
        console.log('fetch user collection useEffect')
    }, [userData]);

    console.log('User page: ',userData)
    
    if ((userData===null)||(collections===null)) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
        <Row className="m-3 justify-content-center">
            <Col sm={3}>
                <Image src={defaultAvatar} roundedCircle />
            </Col>
            <Col>
                <Container className="mt-3 justify-content-center">
                    <h1>{userData.username}</h1>
                    <LinkContainer to="/user/create_collection">             
                        <Button variant="outline-secondary" className="mt-3" size="lg">Create New Collection</Button>
                    </LinkContainer>
                </Container>
            </Col>
        </Row>
        
        <Row className="mt-4">
        <h2 className="text-left my-4">My collections:</h2>
            {collections.map((collection, index) => (
                <Col key={index} md={2} className="mb-4 d-flex flex-column">
                    <LinkContainer to={`/collection/${collection._id}`} >
                        <div className="card-link-container h-100">
                            <Card className="card h-100">
                                <Card.Img variant="top" width="100%" src={defaultAvatar} alt={collection.title} />
                                <Card.Body>
                                    <Card.Title>{collection.title}</Card.Title>
                                    <Card.Subtitle className="text-muted">Theme: {collection.theme}</Card.Subtitle>
                                </Card.Body>
                            </Card>
                        </div>
                    </LinkContainer>
                </Col>
            ))}
        </Row>
        </Container>

    );
};

export default UserPage;
