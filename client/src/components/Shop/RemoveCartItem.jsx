import { deleteOrderItem } from "../../api/order_items";
import useCart from "../../hooks/useCart";
import { Row, Col, Container, Card, Table, Alert } from "react-bootstrap";
import { useState } from "react";
import RemoveConfirmation from "./RemoveConfirmation";
import "bootstrap/dist/css/bootstrap.min.css";

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
          <button type="onClick" onClick={() => showDeleteModal("item", item)}>
            Remove
          </button>
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
