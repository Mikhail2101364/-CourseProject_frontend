import React from "react";
import { Modal, Button } from "react-bootstrap";
import './custom_style_modals.css'

function AnswerModals({ showErrorModal, showSuccessModal, hideErrorModal, hideSuccessModal, collectionName, toCollection }) {

    return (
        <div>
        <Modal show={showErrorModal} onHide={hideErrorModal}>
            <Modal.Header closeButton className="custom-error-modal-header">
            <Modal.Title>Collection already exists</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            A collection with the name <strong>{collectionName}</strong>{" "}
            already exists.
            </Modal.Body>
            <Modal.Footer>
            <Button variant="danger" onClick={hideErrorModal}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>

        <Modal show={showSuccessModal} onHide={hideSuccessModal}>
            <Modal.Header closeButton className="custom-success-modal-header">
            <Modal.Title>Collection created</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            The collection <strong>{collectionName}</strong> was successfully
            created.
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
