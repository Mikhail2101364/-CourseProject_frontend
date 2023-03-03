import React from "react";
import { Modal, Button } from "react-bootstrap";
import './custom_style_modals.css'

function AnswerModals({  showSuccessModal, hideSuccessModal, collectionName, toCollection }) {

    return (
        <div>
        <Modal show={showSuccessModal} onHide={hideSuccessModal}>
            <Modal.Header closeButton className="custom-success-modal-header">
            <Modal.Title>Collection modified</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            The collection <strong>{collectionName}</strong> was successfully
            modified.
            </Modal.Body>
            <Modal.Footer>
            <Button variant="success" onClick={toCollection}>
                Ok
            </Button>
            </Modal.Footer>
        </Modal>
        </div>
    );
}

export default AnswerModals;
