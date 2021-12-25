import axios from 'axios';
import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Slideshow from '../slideshow/Slideshow';
import {useNavigate} from 'react-router-dom';
import './Home.css';

function Home() {
    const [ items, setItems] = useState([]);
    const[load,setLoad] = useState(false);
    useEffect(()=>{
        axios.get("http://localhost:8080/instrument")
        .then(res=>{
            setItems(res.data);
            setLoad(true);
        });
    },[]);

    const navigate = useNavigate();
    const redirect = ()=>{
        navigate("/orders");
    }

    return (
        <div className="container">
            <h1>Buy the Fear - Sell the Greed</h1>
            <Button className="bt" active variant="success" onClick={redirect}><b>Place Your Order</b></Button>
            <br/>
            {load &&
            <>
                <h2>Available Stocks</h2>
                <Slideshow items={items}/>
            </>
            }
            <img src="https://cdn4.vectorstock.com/i/1000x1000/66/73/bull-and-bear-stock-market-financial-bar-chart-vector-30566673.jpg" />
        </div>
    );
}

export default Home;