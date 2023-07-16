import ItemRow from "./ItemRow";
import { Link } from "react-router-dom";
import SingleItem from "./SingleItem";
import AddToCart from "./AddToCart";
import { Row, Col, Container, Card, Table, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Items({ items }) {
  return (
    <div>
      <Container className="mt-4">
        <Card className="mt-2">
          <div className="items-container">
            {items.map((item) => {
              return (
                <div key={item.id} className="item-card">
                  <Link key={item.id} to={`/shop/items/${item.id}`}>
                    <ItemRow key={item.id} item={item} />
                  </Link>
                  <AddToCart item={item} />
                </div>
              );
            })}
          </div>
        </Card>
      </Container>
    </div>
  );
}
