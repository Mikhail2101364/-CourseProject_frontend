import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Button, Card, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import ReactMarkdown from 'react-markdown';
import { serverGetRequest, serverPostAuthRequest } from '../../services/ServerRequest';
import { useAuthData } from '../../hooks/useAuthData'
import { useNavigate } from "react-router-dom";
import './custom_style_ShowItem.css'

function ShowItem() {
    const { userData } = useAuthData();
    const { id } = useParams();
    const [collection, setCollection] = useState(null);
    const [item, setItem] = useState(null);
    const navigate = useNavigate();
   
    useEffect(() => {
        async function fetchItem() {
            const data = await serverGetRequest(`/items/show/${id}`);
            setCollection(data.collection);
            setItem(data.item);
        }
        fetchItem();
    }, [id]);

    const deleteItem = async () => {
        let serwerRes = await serverPostAuthRequest('/items/delete', {
            collectionID: collection._id, 
            itemID: id, 
        });
        if (serwerRes.message==="Item deleted") {
            navigate(`/collection/${collection._id}`);
        } else {
            console.log(serwerRes.message)
        }
    }

    if (!item) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-3">
            <Card>
                <Card.Header as="h2" style={{fontWeight: 'bold'}} className="d-flex justify-content-between align-items-center">
                    {item[0].value}
                    {(userData && (userData.username === collection.authorName)) && (
                        <div>
                        <LinkContainer to={`/item/${id}/modify`} state={{ 
                            item: item,
                            itemSchema: Object.keys(collection.itemSchema),
                            collectionID: collection._id
                        }}>  
                            <Button variant="outline-secondary" className="mx-3" size="lg" >Modify Item</Button>
                        </LinkContainer>
                        <Button variant="outline-secondary" size="lg" onClick={deleteItem}>Delete Item</Button>
                        </div>
                    )}
                </Card.Header>
                <Card.Body>
                    <LinkContainer to={`/collection/${collection._id}`}>
                        <Card.Title className="mb-2 text-muted custom-link">From collection: {collection.title}</Card.Title>
                    </LinkContainer>
                    <Card.Subtitle className="mb-2 text-muted">Theme:  {collection.theme}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">by {collection.authorName}</Card.Subtitle>
                    <Table hover>
                        <tbody>
                            {item.slice(1).map((item,index) => (
                            <tr key={index}>
                                <td className="text-bg-light" style={{fontWeight: 'bold'}}>{item.name}</td>
                                {item.type === 'Checkbox' ? (
                                    <td>
                                        <Form.Check type="checkbox" checked={item.value} readOnly />
                                    </td>
                                ) : item.type === 'Text' ? (
                                    <td>
                                        <ReactMarkdown>{item.value.replace(/\n/g, '  \n')}</ReactMarkdown>
                                    </td>
                                ) : (
                                <td>{item.value}</td>
                                )}
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    );
}

export default ShowItem;
