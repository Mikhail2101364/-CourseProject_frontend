import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

const FieldType = ["Number", "String", "Text", "Date", "Checkbox"];

const CustomFields = (props) => {
    const defaultFields = [
        { name: 'Title', value: '', type: 'String' },
        { name: 'Tags', value: '', type: 'String' }
    ];
    const [fields, setFields] = useState([]);
    const [type, setType] = useState(FieldType[0]);
    const [errorMessage, setErrorMessage] = useState('');
    const { onCustomFieldChange } = props;

    const handleAdd = () => {
        if (fields.filter((field) => field.type === type).length >= 3) {
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

    // const setInputType = (type) => {
    //         switch(type) {
    //             case "Number": return 'number';
    //             case "String": return 'text';
    //             case "Text": return 'textarea';
    //             case "Date": return 'date';
    //             default: break;
    //         }
    // }

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
            {defaultFields.map((field, index) => (
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
            
            {fields.map((field, index) => (
                <Form.Group key={index} className="mb-3">
                    <Row className="mb-2">
                        <Col sm={4}>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Name"
                            value={field.name}
                            onChange={(e) => handleChange(index, 'name', e.target.value)}
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
                        <Button variant="danger" onClick={() => handleRemove(index)}>
                            Remove
                        </Button>
                        </Col>
                    </Row>
                
                {/* {(field.type === "Checkbox") && (
                    <Form.Check onChange={(e) => handleChange(index, 'value', e.target.checked)}/>
                )}
                {(field.type !== "Checkbox") && (
                    <Form.Control
                        as={field.type === "Text" ? 'textarea' : 'input'}
                        type={setInputType(field.type)}
                        placeholder="Value"
                        value={field.value}
                        onChange={(e) => handleChange(index, 'value', e.target.value)}
                    />
                )} */}
                </Form.Group>
            ))}
        </>
    );
};

export default CustomFields;
