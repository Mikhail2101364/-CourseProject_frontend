import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CustomFields from "./CustomFields";
import AnswerModals from "./AnswerModals"
import { serverPostAuthRequest } from '../../services/ServerRequest';

const themes = ["Books", "Paintings", "Music Instruments"];

const CreateCollection = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [theme, setTheme] = useState(themes[0]);
    const [customFields, setCustomFields] = useState([
        { name: 'Title', value: '', type: 'String' },
        { name: 'Tags', value: '', type: 'String' },
    ]);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [collectionID, setCollectionID] = useState("");
    const navigate = useNavigate();

    function createCollectionControl(a) {
        if (a.message === "Collection with this name already exists") {
            setShowErrorModal(true);
        } else if(a.message === "Collection was created") {
            setCollectionID(a.collectionID);
            setShowSuccessModal(true);
        } else {
            console.log(a.message)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let serwerRes = await serverPostAuthRequest('/collections/create', {
            title: title, 
            description: description, 
            theme: theme, 
            customFields: customFields
        });
        await createCollectionControl(serwerRes);
    };

    const toCollection = () => {
        navigate(`/collection/${collectionID}`);
    }

    return (
        <Container className="mb-5">
        <h1>Create New Collection</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicTitle" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
                required
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            </Form.Group>

            <Form.Group controlId="formBasicDescription" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
                required
                as="textarea"
                placeholder="Enter description"
                value={description}
                maxLength={1024}
                onChange={(e) => setDescription(e.target.value)}
            />
            </Form.Group>

            <Form.Group controlId="formBasicTheme" className="mb-3">
            <Form.Label>Theme</Form.Label>
            <Form.Control
                as="select"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
            >
                {themes.map((i) => (
                <option key={i} value={i}>
                    {i}
                </option>
                ))}
            </Form.Control>
            </Form.Group>

            <CustomFields onCustomFieldChange={(i) => setCustomFields(i)} currentCustomFields={customFields}/>

            <Button variant="outline-secondary" type="submit" className="me-4">Create Collection</Button>
        </Form>
        <AnswerModals 
            showErrorModal={showErrorModal} 
            showSuccessModal={showSuccessModal}
            hideErrorModal={() => setShowErrorModal(false)}
            hideSuccessModal={() => setShowSuccessModal(false)}
            collectionName={title}
            toCollection={toCollection}
        />
        </Container>
    )
}

export default CreateCollection;