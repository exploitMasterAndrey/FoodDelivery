import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { createOrder } from "../api";
import { cartActions } from "../store/shopping-cart/cartSlice";

import "../styles/checkout.css";

const Checkout = () => {
  const dispatch = useDispatch();
  const [enterName, setEnterName] = useState("");
  const [enterEmail, setEnterEmail] = useState("");
  const [enterNumber, setEnterNumber] = useState("");
  const [enterAddress, setEnterAddress] = useState("");

  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const shippingCost = 300;

  const totalAmount = cartTotalAmount + Number(shippingCost);

  const submitHandler = (e) => {
    e.preventDefault();

    if(enterName !== "" && enterEmail !== "" && enterNumber !== "" && enterAddress !== ""){
      const newOrder = {
        consumerName: enterName,
        consumerEmail: enterEmail,
        consumerPhone: enterNumber,
        consumerAddress: enterAddress,
        products: cartItems,
        total: totalAmount
      };

      dispatch(cartActions.clearCart());
        
      setEnterName("");
      setEnterEmail("");
      setEnterNumber("");
      setEnterAddress("");

      createOrder(newOrder).then()
    }
  };

  return (
    <Helmet title="Checkout">
      <CommonSection title="Заказ" />
      <section>
        <Container>
          <Row>
            <Col lg="8" md="6">
              <h6 className="mb-4">Адрес доставки</h6>
              <form className="checkout__form" onSubmit={submitHandler}>
                <div className="form__group">
                  <input
                    id="fio"
                    type="text"
                    placeholder="Введите ваше ФИО"
                    value={enterName}
                    required
                    onChange={(e) => setEnterName(e.target.value)}
                  />
                </div>

                <div className="form__group">
                  <input
                    id="email"
                    type="email"
                    placeholder="Введите ваш email"
                    value={enterEmail}
                    required
                    onChange={(e) => setEnterEmail(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    id="number"
                    type="number"
                    placeholder="Номер телефона"
                    value={enterNumber}
                    required
                    onChange={(e) => setEnterNumber(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    id="address"
                    type="text"
                    placeholder="Адрес"
                    value={enterAddress}
                    required
                    onChange={(e) => setEnterAddress(e.target.value)}
                  />
                </div>                
                
                <button type="submit" className="addTOCart__btn">
                  Заказать
                </button>
              </form>
            </Col>

            <Col lg="4" md="6">
              <div className="checkout__bill">
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Стоимость заказа: <span>{cartTotalAmount}Р</span>
                </h6>
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Доставка: <span>{shippingCost}Р</span>
                </h6>
                <div className="checkout__total">
                  <h5 className="d-flex align-items-center justify-content-between">
                    Всего: <span>{totalAmount}Р</span>
                  </h5>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
