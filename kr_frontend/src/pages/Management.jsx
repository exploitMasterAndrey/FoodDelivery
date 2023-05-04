import React from "react";
import { useState, useEffect } from "react"

import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import "../styles/cart-page.css";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { managementActions } from "../store/managementSlice";
import { authtActions } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

import { getAllProducts, createProduct, deleteProduct, updateProduct } from "../api";

const Management = () => {
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.management.allItems);    

    useEffect(() => {
        if(allProducts.length === 0){
            getAllProducts().then((data) => {       
                dispatch(managementActions.setItems(data)); 
            });
        }
    }, []);    

    return (
        <Helmet title="Cart">
            <CommonSection title="Управление " />
            <section>
                <Container>
                    <Row>
                        <Col lg="12">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Фото</th>
                                        <th>Наименование</th>
                                        <th>Цена</th>
                                        <th>Удалить</th>
                                        <th>Редактировать</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allProducts.map((item) => (
                                        <Tr item={item} key={item.id} />
                                    ))}
                                </tbody>
                            </table>                            
                        </Col>
                    </Row>
                </Container>
            </section>
            
            <NewProduct></NewProduct>
        </Helmet>
    );
};


const NewProduct = () => {
    const [image01, setImage01] = useState();
    const [image02, setImage02] = useState();
    const [image03, setImage03] = useState();
    const [title, setTitle] = useState();
    const [price, setPrice] = useState();
    const [category, setCategory] = useState("PIZZA");
    const [description, setDescription] = useState();

    const jwt = useSelector((state) => (state.auth.jwt));
    
    const navigate = useNavigate();
    
    const dispatch = useDispatch();

    const createItem = (product) => {           
        createProduct(product, jwt).then(
          (data) => {
            dispatch(managementActions.addItem(data))
          },          
          (error) => {
            if (error.response && error.response.status === 401) {
                dispatch(authtActions.logout());
                navigate("/login");
            }
          }
        ); 
        setImage01('')
        setImage02('')
        setImage03('')
        setTitle('')
        setPrice('')
        setCategory('')
        setDescription('')
    };

    const categoryOptions = [
        { value: 'PIZZA', label: 'Пицца' },
        { value: 'BURGER', label: 'Бургер' },
        { value: 'SUSHI', label: 'Суши' }
      ]

    return (
        <section>
                <Container>
                    <Row>
                        <Col lg="12">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Фото</th>
                                        <th>Наименование</th>
                                        <th>Цена</th>
                                        <th>Категория</th>
                                        <th>Описание</th>
                                    </tr>
                                </thead>
                                <tbody>

                                <tr>
                                    <td className="text-center cart__img-box">
                                        <input type="text" onChange={(e) => {setImage01(e.target.value)}}/>
                                        <input type="text" onChange={(e) => {setImage02(e.target.value)}}/>
                                        <input type="text" onChange={(e) => {setImage03(e.target.value)}}/>             
                                    </td>
                                    <td className="text-center"><input type="text" onChange={(e) => {setTitle(e.target.value)}}/></td>
                                    <td className="text-center"><input type="text" onChange={(e) => {setPrice(e.target.value)}}/></td>


                                    <td className="text-center">
                                        <select value={category} onChange={(e) => {setCategory(e.target.value)}}>
                                            {categoryOptions.map((option) => (
                                                <option value={option.value}>{option.label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="text-center"><input type="text" onChange={(e) => {setDescription(e.target.value)}}/></td>
                                </tr>
                                    
                                </tbody>
                            </table>
                            <div className="mt-4">
                                <div className="cart__page-btn">
                                    <button className="addTOCart__btn me-4" onClick={(e) => {createItem({title, price, image01, image02, image03, description, category})}}>
                                        Добавить блюдо
                                    </button>
                                </div>
                            </div>
                            
                        </Col>
                    </Row>


                </Container>
            </section>
        
    )
}

const Tr = (props) => {
    const { id, category, description } = props.item;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [image01, setImage01] = useState(props.item.image01);
    const [image02, setImage02] = useState(props.item.image02);
    const [image03, setImage03] = useState(props.item.image03);
    const [title, setTitle] = useState(props.item.title);
    const [price, setPrice] = useState(props.item.price);

    const jwt = useSelector((state) => (state.auth.jwt));

    const deleteItem = () => {
        deleteProduct(id, jwt).then(
        () => {
            dispatch(managementActions.deleteItem(id));
        },          
        (error) => {
          if (error.response && error.response.status === 401) {
              dispatch(authtActions.logout());
              navigate("/login");
          }
        })        
    };

    const editItem = () => {
        updateProduct({id, title, price, image01, image02, image03, category, description}, jwt).then(
        (data) => {
            dispatch(managementActions.editProduct(data));
        },          
        (error) => {
          if (error.response && error.response.status === 401) {
              dispatch(authtActions.logout());
              navigate("/login");
          }
        })        
    }

    return (
        <tr>
            <td className="text-center cart__img-box">
                <img src={image01} alt="" />
                <input type="text" value={image01} onChange={(e) => {setImage01(e.target.value)}}/>
                <input type="text" value={image02} onChange={(e) => {setImage02(e.target.value)}}/>
                <input type="text" value={image03} onChange={(e) => {setImage03(e.target.value)}}/>             
            </td>
            <td className="text-center"><input type="text" value={title} onChange={(e) => {setTitle(e.target.value)}}/></td>
            <td className="text-center"><input type="text" value={price} onChange={(e) => {setPrice(e.target.value)}}/></td>
            <td className="text-center cart__item-del">
                <i class="ri-delete-bin-line" onClick={deleteItem}></i>
            </td>
            <td className="text-center cart__item-del">
                <button onClick={editItem}>Редактировать</button>
            </td>
        </tr>
    );
};

export default Management;
