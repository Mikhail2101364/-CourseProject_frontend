import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import { serverPostAuthRequest } from '../../services/ServerRequest';
import ModifyItemAnswerModals from "./ModifyItemAnswerModals"

const ModifyItem = () => {
    const { state } = useLocation();
    const { item } = state;
    const { id } = useParams();
    const [itemFields, setItemFields] = useState(item);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [itemID, setItemID] = useState("");
    const [itemName, setItemName] = useState("");
    const navigate = useNavigate();

    function modifyItemControl(a) {
        if (a.message === "Item was modified") {
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const modifiedFields = itemFields.map((i)=> {return {[i.type+'_'+i.name]: i.value}})
        let serwerRes = await serverPostAuthRequest(`/items/${id}/modify`, {
            itemFields: modifiedFields, 
        });
        await modifyItemControl(serwerRes);
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
        <h1>Modify Item</h1>
        <Form onSubmit={handleSubmit}>
            {itemFields.map((field, index) => (
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
                            checked={field.value}
                                onChange={(e) => handleChange(index, 'value', e.target.checked)} 
                            />
                        )}
                        {(field.type !== "Checkbox") && (
                            <Form.Control
                                as={field.type === "Text" ? 'textarea' : 'input'}
                                type={setInputType(field.type)}
                                placeholder="Value"
                                value={field.value}
                                onChange={(e) => handleChange(index, 'value', e.target.value)}
                                required
                            />
                        )}
                        </Col>
                    </Row>
                </Form.Group>
            ))}
            <Button variant="outline-secondary" type="submit" className="me-4">Modify Item</Button>
        </Form>
        <ModifyItemAnswerModals 
            showSuccessModal={showSuccessModal}
            hideSuccessModal={() => setShowSuccessModal(false)}
            itemName={itemName}
            toItem={toItem}
        />
        </Container>
    )
}

export default ModifyItem;