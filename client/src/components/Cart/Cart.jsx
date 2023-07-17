import { useEffect, useState } from "react";

import "../../App.css";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import AddToCart from "../Shop/AddToCart";
import RemoveCartItem from "../Shop/RemoveCartItem";
import { fetchMyCart } from "../../api/auth";
import { Row, Col, Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { Link } from "react-router-dom";

let cartImg =
  "https://em-content.zobj.net/source/microsoft-teams/363/shopping-cart_1f6d2.png";

export default function Cart() {
  const { user } = useAuth();
  const { cart, setCart } = useCart();
  const [click, setClick] = useState();
  const [setThisQuantity] = useState();

  useEffect(() => {
    cart.userId = user.id;
    async function getCart() {
      let thatCart = JSON.parse(localStorage.getItem("cart"));
      if (thatCart !== null) {
        await setCart(thatCart);
      } else {
        await setCart(cart);
      }
      setCart(cart);
    }
    getCart();
  }, [click]);

  //sets cart items on load so that cart.items have item.order_item_id
  useEffect(() => {
    async function setCartItems() {
      const result = await fetchMyCart();
      if (result.success) {
        setCart(result.order);
        return;
      } else {
        setCart(cart);
      }
    }
    setCartItems();
  }, []);

  //re-renders totalPrice and price
  function handleClick(e) {
    e.preventDefault();
    setClick(e.target.value);
  }

  return (
    <div className="cart">
      <Container>
        <h1>Cart</h1>
        <h2> Total Price: $ {cart.totalPrice ? cart.totalPrice : 0}</h2>
        <div>
          <Row>
            <Card className="scroll">
              <Col md={{ span: 10, offset: 2 }}>
                {cart.items &&
                  cart.items.map((item) => {
                    return (
                      <div key={item.id} className="item-card">
                        <p>Item: {item.name}</p>
                        <p>Price: ${item.cost}</p>
                        <p>Subtotal: ${item.cost * item.quantity}</p>
                        <AddToCart
                          item={item}
                          handleClick={handleClick}
                          setThisQuantity={setThisQuantity}
                        />
                        <RemoveCartItem item={item} />
                      </div>
                    );
                  })}
              </Col>
            </Card>
          </Row>
        </div>
        <Link to={"http://localhost:5173/checkout"}>
          <button className="checkout">Checkout</button>
        </Link>
      </Container>
    </div>
  );
}
