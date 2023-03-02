import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ModifyCustomFields from "./ModifyCustomFields";
import AnswerModals from "./AnswerModals"
import { serverPostAuthRequest } from '../../services/ServerRequest';

const themes = ["Books", "Paintings", "Music Instruments"];

const ModifyCollection = () => {
    const { state } = useLocation();
    const { collection } = state;
    const { id } = useParams();

    const [description, setDescription] = useState(collection.description);
    const [theme, setTheme] = useState(collection.theme);
    const [customFields, setCustomFields] = useState(collection.fields);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [collectionID, setCollectionID] = useState("");
    const navigate = useNavigate();

    function modifyCollectionControl(a) {
        if (a.message === "Collection with this name already exists") {
            setShowErrorModal(true);
        } else if(a.message === "Collection was modified") {
            setCollectionID(a.collectionID);
            setShowSuccessModal(true);
        } else {
            console.log(a.message)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('new fields: ',customFields)
        let serwerRes = await serverPostAuthRequest(`/collections/modify/${id}`, {
            description: description, 
            theme: theme, 
            customFields: customFields,
        });
        await modifyCollectionControl(serwerRes);
        console.log(await serwerRes)
    };

    const toCollection = () => {
        navigate(`/collection/${collectionID}`);
    }

    return (
        <Container className="mb-5">
        <h1>Modify Collection</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicTitle" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter title"
                value={collection.name}
                disabled
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

            <ModifyCustomFields onCustomFieldChange={(i) => setCustomFields(i)} currentCustomFields={customFields}/>

            <Button variant="outline-secondary" type="submit" className="me-4">Create Collection</Button>
        </Form>
        <AnswerModals 
            showErrorModal={showErrorModal} 
            showSuccessModal={showSuccessModal}
            hideErrorModal={() => setShowErrorModal(false)}
            hideSuccessModal={() => setShowSuccessModal(false)}
            collectionName={collection.name}
            toCollection={toCollection}
        />
        </Container>
    )
}

export default ModifyCollection;