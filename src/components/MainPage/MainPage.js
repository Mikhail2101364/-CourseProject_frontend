import React from 'react';
import { Nav, Container, Row, Col, Card } from 'react-bootstrap';
import './custom_style.css'


function MainPage ({ collections, lastAddedItems }) {
    return(
        <Container style={{ marginTop: '50px' }} >
        <h2 className="text-left mb-4">Collections</h2>
        <Row>
            {collections.map((collection, index) => (
                <Col key={index} md={4} className="mb-4">
                    <Nav.Link href={`/collections/${collection.id}`} className="card-link">
                        <Card className="card">
                            <Card.Img variant="top" width="100%" src={collection.image} alt={collection.title} />
                            <Card.Body>
                            <Card.Title>{collection.title}</Card.Title>
                            <Card.Subtitle className="text-muted">by {collection.author}</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </Nav.Link>
                </Col>
            ))}
        </Row>
        <h2 className="text-left mb-4 mt-4">Last Added Items</h2>
        <Row>
            {lastAddedItems.map((item, index) => (
                <Col key={index} md={4} className="mb-4">
                    <Nav.Link href="#" className="card-link">
                        <Card className="card">
                            <Card.Img variant="top" width="100%" src={item.image} alt={item.title} />
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Subtitle className="text-muted">from {item.collectionTitle} collection</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </Nav.Link>
                </Col>
            ))}
          </Row>
      </Container>
    )
    
}

export default MainPage;