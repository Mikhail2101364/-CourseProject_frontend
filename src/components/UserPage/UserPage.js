import React, { useState, useEffect, } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import defaultAvatar from '../../pictures/defaultAvatar.png';
import { useAuthData } from '../../hooks/useAuthData'
import { serverJWTRequest, serverPostAuthFormDataImageRequest, serverPostAuthRequest } from '../../services/ServerRequest';
import './custom_style_UserPage.css'

import ImageWithDropzone from './ImageWithDropzone';

const UserPage = () => {

    const { userData, updateUserData } = useAuthData();
    const [collections, setCollections] = useState(null);

    useEffect(() => {
        async function fetchCollections() {
            const data = await serverJWTRequest('/collections/user');
            setCollections(data)
        }
        fetchCollections();
    }, [userData]);

    const [userAvatar, setUserAvatar] = useState(userData.avatarUrl ? userData.avatarUrl : null);

    const handleFileUpload = async function (newFile) {
        const avatarURL = await serverPostAuthFormDataImageRequest('/users/setavatar', newFile, userData.username);
        console.log('setUserAvatar',avatarURL);
        setUserAvatar(avatarURL.userAvatar);
        updateUserData(()=>{});
    }

    const handleFileDelete = async function () {
        const deleteAvatar = await serverPostAuthRequest('/users/deleteavatar', { avatarUrl: userData.avatarUrl });
        console.log('setUserAvatar',deleteAvatar);
        setUserAvatar(deleteAvatar.userAvatar);
        updateUserData(()=>{});
    }


    if ((userData===null)||(collections===null)) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Row className="m-3 justify-content-center">
                <Col sm={3}>
                    <ImageWithDropzone 
                        imageDefaultAvatar={defaultAvatar} 
                        onFileUpload={handleFileUpload}
                        onFileDelete={handleFileDelete}
                        imageUserAvatar={userAvatar}
                    />
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
