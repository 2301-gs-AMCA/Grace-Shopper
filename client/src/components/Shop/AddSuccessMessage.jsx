import { Modal, Button } from "react-bootstrap";
import { useState } from "react";

export default function AddSuccessMessage({
  showModal,
  hideModal,
  item,
  message,
}) {
  return (
    <Modal show={showModal} onHide={hideModal}>
      <Modal.Body
        className="alert alert-success alert-dismissible fade show"
        role="alert"
        data-tor="show:scale.from(0)"
      >
        <div>
          <strong>Success!</strong> Cart updated!!
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={hideModal}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}
