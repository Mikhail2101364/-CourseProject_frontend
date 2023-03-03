import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

const FieldType = ["Number", "String", "Text", "Date", "Checkbox"];

const ModifyCustomFields = (props) => {
    const { onCustomFieldChange, currentCustomFields } = props;
    const [fields, setFields] = useState(currentCustomFields);
    const [type, setType] = useState(FieldType[0]);
    const [errorMessage, setErrorMessage] = useState('');
    const numberOfdefaultFields = 2;

    const handleAdd = () => {
        if (type === "String") {
            if (fields.filter((field) => field.type === "String").length >= 5) {
                setErrorMessage(`Only 3 fields of type String are allowed`);
                return;
            }
        } else if (fields.filter((field) => field.type === type).length >= 3) {
            setErrorMessage(`Only 3 fields of type ${type} are allowed`);
            return;
        }
        setFields((fields)=>[...fields, { name: '', value: '', type }]);
    };

    const handleChange = (index, name, value) => {
        const newFields = [...fields];
        newFields[index] = { ...newFields[index], [name]: value };
        setFields(newFields);
        onCustomFieldChange(newFields);
    };

    const handleRemove = (index) => {
        const newFields = [...fields];
        newFields.splice(index, 1);
        setFields(newFields);
        onCustomFieldChange(newFields);
    };

    const handleTypeChange = (e) => {
        setType(e.target.value);
        setErrorMessage('');
    };

    return (
        <>
        <Form.Group controlId="customFields" className="mb-4">
            <Form.Label>User Item Fields</Form.Label>
            <Row className="mb-3">
                <Col sm={2}>
                    <Form.Control 
                        as="select" 
                        value={type} 
                        onChange={handleTypeChange}
                    >
                    {FieldType.map((i) => (
                        <option key={i} value={i}>
                            {i}
                        </option>
                    ))}
                    </Form.Control>
                </Col>
                <Col sm={2}>
                    <Button variant="outline-secondary" onClick={handleAdd}>Add Custom Field</Button>
                </Col>
                <Col sm={8}>
                    {errorMessage && <Form.Text className="text-danger">{errorMessage}</Form.Text>}
                </Col>
            </Row>
            </Form.Group>
            {fields.slice(0,2).map((field, index) => (
                <Form.Group key={index} className="mb-3">
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
                        <Col sm={3}>
                            <Button variant="danger" disabled>
                                Remove
                            </Button>
                        </Col>
                    </Row>
                </Form.Group>
            ))}
            
            {fields.slice(2).map((field, index) => (
                <Form.Group key={index} className="mb-3">
                    <Row className="mb-2">
                        <Col sm={4}>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Name"
                            value={field.name}
                            onChange={(e) => handleChange(index+numberOfdefaultFields, 'name', e.target.value)}
                        />
                        </Col>
                        
                        <Col sm={3}>
                        <Form.Control
                            as="select"
                            value={field.type}
                            disabled
                        >
                            {FieldType.map((fieldType) => (
                            <option key={fieldType} value={fieldType}>
                                {fieldType}
                            </option>
                            ))}
                        </Form.Control>
                        </Col>
                        <Col sm={3}>
                        <Button variant="danger" onClick={() => handleRemove(index+numberOfdefaultFields)}>
                            Remove
                        </Button>
                        </Col>
                    </Row>
                </Form.Group>
            ))}
        </>
    );
};

export default ModifyCustomFields;
