import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './custom_style_MainPage.css'
import { serverGetRequest } from '../../services/ServerRequest';
import defaultAvatar from '../../pictures/defaultAvatar.png';


function MainPage () {

    const [collections, setCollections] = useState(null);
    const [items, setItems] = useState(null);

    useEffect(() => {
        async function fetchLastCollections() {
            const data = await serverGetRequest('/collections/last');
            setCollections(data)
        }
        async function fetchLastItems() {
            const data = await serverGetRequest('/items/last');
            console.log('items: ', items)
            setItems(data)
        }
        fetchLastCollections();
        fetchLastItems();
        console.log('MainPage useEffect')
    }, []);

    // if ((collections===null)) {
    //     return <div>Loading...</div>;
    // }

    return(
        <Container className="mt-5">
        <h2 className="text-left mb-4">Collections</h2>
        <Row className="justify-content-md-evenly">
            {collections && collections.map((collection, index) => (
                <Col key={index} md={3} className="mb-4">
                    <LinkContainer to={`/collection/${collection._id}`}>
                        <div className="card-link h-100">
                        <Card className="card h-100">
                            <Card.Img variant="top" width="100%" src={collection.avatarUrl || defaultAvatar} alt={collection.title} />
                            <Card.Body>
                            <Card.Title>{collection.title}</Card.Title>
                            <Card.Subtitle className="text-muted">by {collection.authorName}</Card.Subtitle>
                            </Card.Body>
                        </Card>
                        </div>
                    </LinkContainer>
                </Col>
            ))}
        </Row>
        <h2 className="text-left mb-4 mt-4">Last Added Items</h2>
        <Row className="justify-content-md-evenly">
            {items && items.map((item, index) => (
                <Col key={index} md={3} className="mb-4">
                    <LinkContainer to={`/item/${item._id}`}>
                        <div className="card-link h-100">
                        <Card className="card h-100">
                            <Card.Header as="h2" style={{fontWeight: 'bold'}}>
                                {item.customFields.String_Title}
                            </Card.Header>
                            <Card.Body>
                                <Card.Title className="mb-2 text-muted">From collection: {item.collectionTitle}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Theme:  {item.theme}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">by {item.authorName}</Card.Subtitle>
                            </Card.Body>
                        </Card>
                        </div>
                    </LinkContainer>
                </Col>
            ))}
          </Row>
      </Container>
    )
    
}

export default MainPage;