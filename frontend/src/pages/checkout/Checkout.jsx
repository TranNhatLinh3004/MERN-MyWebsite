import React from "react";
import { Col, FormGroup, Form, Container, Row } from "reactstrap";
import "./checkout.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Helmet from "../../assets/helmet/Helmet";
function Checkout(props) {
  const navigate = useNavigate();
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const handleClick = (e) => {
    e.preventDefault();

    navigate("/thank-you");
    // console.log(credentials);
  };
  return (
    <Helmet title="Checkout">
      {/* <CommonSection title="Checkout" /> */}
      <section className="checkout__cart">
        <Col lg="8">
          <h6 className="mb-4 fw-bold">Billing Information</h6>
          <Form className="form__group">
            <FormGroup>
              <input type="text" placeholder="Enter your name" />
            </FormGroup>

            <FormGroup>
              <input type="email" placeholder="Enter your email" />
            </FormGroup>

            <FormGroup>
              <input type="number" placeholder="Phone number" />
            </FormGroup>

            <FormGroup>
              <input type="text" placeholder="Street Address" />
            </FormGroup>
            <FormGroup>
              <input type="text" placeholder="Postal code" />
            </FormGroup>
          </Form>
        </Col>
        <Col lg="4">
          <div className="checkout__cart1">
            <h6>
              Total Qty:{" "}
              <span>
                {totalQuantity > 1
                  ? `${totalQuantity} items`
                  : `${totalQuantity} item`}
              </span>
            </h6>

            <h6>
              Subtotal: <span>${totalAmount}</span>
            </h6>
            <h6>
              Shipping: <span>$0</span>
            </h6>
            <h6>Free Shipping</h6>
            <hr />
            <h4>
              Total Cost: <span>${totalAmount}</span>
            </h4>
          </div>
          <button className="buy__btn auth__btn w-100" onClick={handleClick}>
            Place an order
          </button>
        </Col>
        
      </section>
    </Helmet>
  );
}

export default Checkout;
