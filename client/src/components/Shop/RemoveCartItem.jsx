import { deleteOrderItem } from "../../api/order_items";

export default function RemoveCartItem({ item }) {
  console.log("item in removeItem", item);
  return (
    <form
      onClick={(e) => {
        e.preventDefault();
        const confirm = window.confirm(
          "Are you sure you want to remove this item from your cart?"
        );
        if (confirm === true) {
          deleteOrderItem(item.order_item_id);
        }
      }}
    >
      <button type="onClick">Remove</button>
    </form>
  );
}
