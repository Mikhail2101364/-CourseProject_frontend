import React from "react";
import { Modal, Button } from "react-bootstrap";
import './custom_style_Item_modals.css'

function ModifyItemAnswerModals({ showSuccessModal, hideSuccessModal, itemName, toItem }) {

    return (
        <Modal show={showSuccessModal} onHide={hideSuccessModal}>
            <Modal.Header closeButton className="custom-success-modal-header">
            <Modal.Title>Item modified</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            The item <strong>{itemName}</strong> was successfully
            modified.
            </Modal.Body>
            <Modal.Footer>
            <Button variant="success" onClick={toItem}>
                Ok
            </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModifyItemAnswerModals;
