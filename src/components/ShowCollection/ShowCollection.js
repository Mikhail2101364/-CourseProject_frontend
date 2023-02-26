import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Image, Container, Row, Col } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { serverGetRequest } from '../../services/ServerRequest';
import defaultAvatar from '../../pictures/defaultAvatar.png';
import './custom_style.css'

function ShowCollection() {
    const { id } = useParams();
    const [collection, setCollection] = useState(null);
    const [items, setItems] = useState(null);
   
    useEffect(() => {
        async function fetchCollection() {
            const data = await serverGetRequest(`/collections/show/${id}`);
            console.log(data)
            console.log('data.coll: ',data.data.collection)
            setCollection(data.data.collection);
            setItems(data.data.items);
        }

        fetchCollection();
        console.log('show collection useEffect')
    }, [id]);

    if (!collection) {
        return <div>Loading...</div>;
    }

    
    console.log('render coll')
    console.log('coll: ',collection)
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
            <Table striped bordered hover>
                <thead>
                <tr>
                    {collection.fields.map((field) => (
                    <th key={field.name}>{field.name}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {items.map((item) => (
                    <tr key={item._id}>
                    {collection.fields.map((field) => (
                        <td key={`${item._id}-${field.name}`}>{item[field.name]}</td>
                    ))}
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default ShowCollection;
