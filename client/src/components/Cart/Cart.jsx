import { useCallback, useEffect, useState } from "react";

import "../../App.css";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import AddToCart from "../Shop/AddToCart";
import RemoveCartItem from "../Shop/RemoveCartItem";
import { patchOrder } from "../../api/orders";
import { fetchMyCart } from "../../api/auth";
import { Row, Col, Container, Card, Table, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { useNavigate, Link } from "react-router-dom";

let cartImg =
  "https://em-content.zobj.net/source/microsoft-teams/363/shopping-cart_1f6d2.png";

export default function Cart() {
  const { user, setUser } = useAuth();
  const { cart, setCart, isCounted } = useCart();
  const navigate = useNavigate();
  const [click, setClick] = useState();
  const [thisQuantity, setThisQuantity] = useState();
  const nav = useNavigate();

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
      /*const result = await fetchMyCart();
      if (result.success) {
        console.log("result in getMyCart", result);
        setCart(result.order);
        return;
      } else {
        setCart(cart);
      }*/
    }
    getCart();
    console.log("cart", cart);
  }, [click]);

  //sets cart items on load so that cart.items have item.order_item_id
  useEffect(() => {
    async function setCartItems() {
      const result = await fetchMyCart();
      if (result.success) {
        console.log("result in getMyCart", result);
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
  console.log("cart before complete order:", cart);
  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   try {
  //     async function completeOrder() {
  //       const result = await patchOrder(cart.id, {
  //         id: cart.id,
  //         userId: user.id,
  //         isCart: false,
  //         isComplete: true,
  //         date: cart.order_date,
  //       });
  //       setCart(result.order);

  //       localStorage.removeItem("cart");

  //       setClick(!click);
  //       return;
  //     }
  //     completeOrder();

  //     return;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

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
