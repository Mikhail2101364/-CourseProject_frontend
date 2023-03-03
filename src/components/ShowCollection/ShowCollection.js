import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Image, Container, Row, Col, Button, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import ReactMarkdown from 'react-markdown';
import { serverGetRequest, serverPostAuthRequest } from '../../services/ServerRequest';
import defaultAvatar from '../../pictures/defaultAvatar.png';
import { useAuthData } from '../../hooks/useAuthData'
import { useNavigate } from "react-router-dom";
import './custom_style_ShowCollection.css'

function ShowCollection() {
    const { userData } = useAuthData();
    const { id } = useParams();
    const [collection, setCollection] = useState(null);
    const [items, setItems] = useState(null);
    const navigate = useNavigate();
   
    useEffect(() => {
        async function fetchCollection() {
            const data = await serverGetRequest(`/collections/show/${id}`);
            setCollection(data.collection);
            setItems(data.items);
        }
        fetchCollection();
    }, [id]);

    const deleteCollection = async () => {
        let serwerRes = await serverPostAuthRequest('/collections/delete', {
            collectionID: id, 
        });
        if (serwerRes.message==="Collection deleted") {
            navigate('/user');
        } else {
            console.log(serwerRes.message);
        }
    }

    if (!collection) {
        return <div>Loading...</div>;
    }

    return (
        <Container fluid>
            <Row className="m-3">
                <Col sm={2}>
                    <Image src={defaultAvatar} thumbnail />
                </Col>
                <Col>
                    <h1>{collection.name}</h1>
                    <p>Author: {collection.authorName}</p>
                    <ReactMarkdown>{collection.description.replace(/\n/g, '  \n')}</ReactMarkdown>
                </Col>
            </Row>
            {(userData && (userData.username === collection.authorName)) && (
            <Row className="m-3">
                <Col sm={2} className="d-flex">
                    <LinkContainer to='/item/add' state={{ 
                        collectionID: id,
                        fields: collection.fields,
                        itemSchema: collection.itemSchema
                    }}>             
                        <Button variant="outline-secondary" className="mt-3 flex-fill" size="lg" >Add New Item</Button>
                    </LinkContainer>
                </Col>
                <Col sm={2} className="d-flex">
                    <LinkContainer to={`/collection/${id}/modify`} state={{ 
                            collection: collection
                        }}>  
                        <Button variant="outline-secondary" className="mt-3 flex-fill" size="lg" >Modify Collection</Button>
                    </LinkContainer>
                </Col>
                <Col sm={2} className="d-flex">
                    <Button variant="outline-secondary" className="mt-3 flex-fill" size="lg" onClick={deleteCollection}>Delete Collection</Button>
                </Col>
            </Row>
            )}
            <Row className="m-3">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            {collection.fields.map((field) => (
                                <th key={field.name}>{field.name}</th>
                            ))}
                        </tr>
                    </thead>
                    
                    <tbody>
                    {items[0]._id && items.map((item) => (
                        <LinkContainer key={`${item._id}-link`} to={`/item/${item._id}`}>
                            <tr className="custom-table-row">
                            {collection.itemSchema.map((field, index) => (
                                <td key={`${item._id}-${field}`} className="align-middle">
                                    {collection.fields[index].type === 'Checkbox' ? (
                                        <Form.Check type="checkbox" checked={item.customFields[field]} readOnly />
                                    ) : collection.fields[index].type === 'Text' ? (
                                        <ReactMarkdown>{item.customFields[field].replace(/\n/g, '  \n')}</ReactMarkdown>
                                    ) : (
                                        <p>{item.customFields[field]}</p>
                                    )}
                                </td>
                            ))}
                            </tr>
                        </LinkContainer>
                    ))}
                    </tbody>
                    
                </Table>
            </Row>
        </Container>
    );
}

export default ShowCollection;
