import { deleteOrderItem } from "../../api/order_items";
import useCart from "../../hooks/useCart";

export default function RemoveCartItem({ item }) {
  const { isCounted, setIsCounted } = useCart();
  return (
    <form
      onClick={(e) => {
        e.preventDefault();
        const confirm = window.confirm(
          "Are you sure you want to remove this item from your cart?"
        );
        if (confirm === true) {
          deleteOrderItem(item.order_item_id);
          setIsCounted(!isCounted);
        }
      }}
    >
      <button type="onClick">Remove</button>
    </form>
  );
}
