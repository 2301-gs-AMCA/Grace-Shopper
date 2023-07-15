import { deleteOrderItem } from "../../api/order_items";
import useCart from "../../hooks/useCart";

export default function RemoveCartItem({ item }) {
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
      <button className="remove" type="onClick">
        Remove
      </button>
    </form>
  );
}
