import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import { serverPostAuthRequest } from '../../services/ServerRequest';
import ItemAnswerModals from "./ItemAnswerModals"

// const themes = ["Books", "Paintings", "Music Instruments"];

const CreateItem = () => {
    const { state } = useLocation();
    const { collectionID, fields, itemSchema } = state;
    const [itemFields, setItemFields] = useState([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [itemID, setItemID] = useState("");
    const [itemName, setItemName] = useState("");
    const navigate = useNavigate();

    function createItemControl(a) {
        if (a.message === "Item was created") {
            setItemID(a.itemData._id);
            setItemName(a.itemData.customFields.String_Title)
            setShowSuccessModal(true);
        } else {
            console.log(a.message)
        }
    }

    const handleChange = (index, name, value) => {
        const newFields = [...itemFields];
        newFields[index] = { ...newFields[index], [name]: value };
        setItemFields(newFields);
    };

    function checkCheckboxes(itemFields, itemSchema) {
        itemFields.map((i,n)=>{
            if ((i===undefined)&&(itemSchema[n].split('_')[0]==="Checkbox")) {
                const newFields = [...itemFields];
                newFields[n] = { ...newFields[n], [itemSchema[n]]: false };
                setItemFields(newFields);
            }
        })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('fields to submit 1: ',itemFields)
        let serwerRes = await serverPostAuthRequest('/items/create', {
            collectionID: collectionID, 
            itemFields: itemFields, 
        });
        await createItemControl(serwerRes);
        console.log(await serwerRes)
    };

    const toItem = () => {
        navigate(`/item/${itemID}`);
    }

    const setInputType = (type) => {
        switch(type) {
            case "Number": return 'number';
            case "String": return 'text';
            case "Text": return 'textarea';
            case "Date": return 'date';
            default: break;
        }
    }

    return (
        <Container>
        <h1>Create New Item</h1>
        <Form onSubmit={handleSubmit}>
            {fields.map((field, index) => (
                <Form.Group key={index} className="mb-4">
                    <Row className="mb-2">
                        <Col sm={4}>
                        <Form.Control
                            type="text"
                            value={field.name}
                            disabled
                        />
                        </Col>
                        
                        <Col sm={3}>
                        <Form.Control
                            type="text"
                            value={field.type}
                            disabled
                        />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={7}>
                        {(field.type === "Checkbox") && (
                            <Form.Check 
                                onChange={(e) => handleChange(index, itemSchema[index], e.target.checked)} 
                                onLoad={checkCheckboxes(itemFields, itemSchema)}
                            />
                        )}
                        {(field.type !== "Checkbox") && (
                            <Form.Control
                                as={field.type === "Text" ? 'textarea' : 'input'}
                                type={setInputType(field.type)}
                                placeholder="Value"
                                onChange={(e) => handleChange(index, itemSchema[index], e.target.value)}
                                required
                            />
                        )}
                        </Col>
                    </Row>
                </Form.Group>
            ))}
            <Button variant="outline-secondary" type="submit" className="me-4">Create Item</Button>
        </Form>
        <ItemAnswerModals 
            showSuccessModal={showSuccessModal}
            hideSuccessModal={() => setShowSuccessModal(false)}
            itemName={itemName}
            toItem={toItem}
        />
        </Container>
    )
}

export default CreateItem;