import { deleteOrderItem } from "../../api/order_items";
import useCart from "../../hooks/useCart";
import { Modal, Button } from "bootstrap";
import { Row, Col, Container, Card, Table, Alert } from "react-bootstrap";
import { useState } from "react";
import RemoveConfirmation from "./RemoveConfirmation";
import "bootstrap/dist/css/bootstrap.min.css";

const DeleteConfirmation = ({
  showModal,
  hideModal,
  confirmModal,
  item,
  message,
}) => {
  return (
    <Modal show={showModal} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Remove Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="alert alert-danger">{message}</div>
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
};

export default function RemoveCartItems({ item }) {
  const { setCart, isCounted, setIsCounted } = useCart();
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);

  const showDeleteModal = (item) => {
    setDeleteMessage(
      `Are you sure you want to remove the item '${item.name}'?`
    );

    setDisplayConfirmationModal(true);
  };

  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  const submitDelete = (item) => {
    setDisplayConfirmationModal(false);
    async function removeItem() {
      const order = await deleteOrderItem(item.order_item_id);
      setCart(order);
      setIsCounted(!isCounted);
    }
    removeItem();
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <Card className="mt-2">
            <Card.Body striped bordered hover size="sm">
              <button
                type="onClick"
                onClick={() => showDeleteModal("item", item)}
              >
                Remove
              </button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <RemoveConfirmation
        showModal={displayConfirmationModal}
        confirmModal={submitDelete}
        hideModal={hideConfirmationModal}
        item={item}
        message={deleteMessage}
      />
    </Container>
  );
}

/*export default function RemoveCartItem({ item }) {
  const { setCart, isCounted, setIsCounted } = useCart();
  return (
    <form
      onClick={async (e) => {
        e.preventDefault();
        const confirm = window.confirm(
          "Are you sure you want to remove this item from your cart?"
        );
        if (confirm === true) {
          const order = await deleteOrderItem(item.order_item_id);
          setCart(order);
          setIsCounted(!isCounted);
        }
      }}
    >
      <button type="onClick">Remove</button>
    </form>
  );
}*/
