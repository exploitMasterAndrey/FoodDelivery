import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";

import { useDispatch } from "react-redux";
import { cartActions } from "../store/shopping-cart/cartSlice";

import { getProductById } from "../api";

import "../styles/product-details.css";

const FoodDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [previewImg, setPreviewImg] = useState();    

  const [product, setProduct] = useState();

  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  const [image01, setImage01] = useState();
  const [image02, setImage02] = useState();
  const [image03, setImage03] = useState();

  useEffect(() => {    
    getProductById(id).then((data) => {
      setProduct(data);
      console.log(product)
      setTitle(data.title)
      setPrice(data.price)
      setCategory(data.category)
      setDescription(data.description)
      setImage01(data.image01)    
      setImage02(data.image02)
      setImage03(data.image03)  
      setPreviewImg(data.image01);
    })
    
  }, []);  

  const addItem = () => {
    dispatch(
      cartActions.addItem({
        id,
        title,
        price,
        image01,
      })
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title="Product-details">
      <CommonSection title={title} />

      <section>
        <Container>
          <Row>
            <Col lg="2" md="2">
              <div className="product__images ">
                <div
                  className="img__item mb-3"
                  onClick={() => setPreviewImg(image01)}
                >
                  <img src={image01} alt="" className="w-50" />
                </div>
                <div
                  className="img__item mb-3"
                  onClick={() => setPreviewImg(image02)}
                >
                  <img src={image02} alt="" className="w-50" />
                </div>

                <div
                  className="img__item"
                  onClick={() => setPreviewImg(image03)}
                >
                  <img src={image03} alt="" className="w-50" />
                </div>
              </div>
            </Col>

            <Col lg="4" md="4">
              <div className="product__main-img">
                <img src={previewImg} alt="" className="w-100" />
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="single__product-content">
                <h2 className="product__title mb-3">{title}</h2>
                <p className="product__price">
                  {" "}
                  Цена: <span>{price}Р</span>
                </p>
                <p className="category mb-5">
                  Категории: <span>{category}</span>
                </p>

                <button onClick={addItem} className="addTOCart__btn">
                  Добавить в корзину
                </button>
              </div>
            </Col>

            <Col lg="12">
              <div className="tabs d-flex align-items-center gap-5 py-3">
                <h6>
                  Описание
                </h6>                
              </div>
              <div className="tab__content">
                  <p>{description}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default FoodDetails;
