import { Modal } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Shop.css";

export default function AddSuccessMessage({ showModal, hideModal }) {
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
