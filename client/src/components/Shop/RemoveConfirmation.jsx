import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import "./Shop.css";

export default function RemoveConfirmation({
  showModal,
  hideModal,
  confirmModal,
  item,
  message,
}) {
  return (
    <Modal id="remove_confirm" show={showModal} onHide={hideModal}>
      <Modal.Header>
        <Modal.Title>Remove Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body className="alert alert-danger">
        <div>
          Are you sure you want to remove the item {item.name} from your cart?
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="default" onClick={hideModal}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => confirmModal(item)}>
          Remove
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
