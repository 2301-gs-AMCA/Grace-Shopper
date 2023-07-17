import { Modal, Alert, Button, Container } from "react-bootstrap";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Shop.css";

export default function AddSuccessMessage({
  showModal,
  hideModal,
  item,
  message,
}) {
  return (
    <div className="modal-dialog">
      <Modal id="modal" show={showModal} onHide={hideModal}>
        <div
          id="success"
          className="alert alert-success alert-dismissible fade show"
          role="alert"
          data-tor="show:scale.from(0)"
        >
          <strong>Success:</strong> Cart updated!!
          <button
            type="button"
            className="alert alert-success btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={hideModal}
          />
        </div>
      </Modal>
    </div>
  );
}

<div class="alert alert-secondary" role="alert">
  A simple secondary alert with{" "}
  <a href="#" class="alert-link">
    an example link
  </a>
  . Give it a click if you like.
</div>;
