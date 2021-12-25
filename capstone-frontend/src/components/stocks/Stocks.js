import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert'
import './stocks.css';

function Stocks() {

    const [buyOrders, setBuyOrders] = useState([]);
    const [sellOrders, setSellOrders] = useState([]);
    const [buyOrdersLoad, setBuyOrdersLoad] = useState(false);
    const [sellOrdersLoad, setSellOrdersLoad] = useState(false);

    const [top,setTop] = useState(-65);

    useEffect(() => {
        axios.get("http://localhost:8080/buyOrders")
            .then(res => {
                setBuyOrders(res.data)
                setBuyOrdersLoad(true)
                setTop(top-5-res.data.length*210)
            })
            .catch(err => console.log("Error in Buy Orders"))

        axios.get("http://localhost:8080/sellOrders")
            .then(res => {
                setSellOrders(res.data)
                setSellOrdersLoad(true)
            })
            .catch(err => console.log("Error in sell Orders"))

    }, [])

    const getBuyOrdersList = () => {
        const buyOrdersList = buyOrders.map(item => (
            <Card
                bg={item.status=='Active'?'info':'secondary'}
                key={item.id}
                style={{ width: '18rem' }}
                className="mb-2"
            >
                <Card.Header>Order Id: {item.id}</Card.Header>
                <Card.Body>
                    <Card.Title>Instrument Id: {item.instrumentId}</Card.Title>
                    <Card.Text>
                        Client Id : {item.clientId}<br/>
                        Price: {item.price}<br/>
                        Quantity: {item.quantity}<br/>
                        Status:{item.status}
                    </Card.Text>
                </Card.Body>
            </Card>
        ));
        return buyOrdersList;
    }

    const getSellOrdersList = () => {
        const sellOrdersList = sellOrders.map(item => (
            <Card
                bg={item.status=='Active'?'info':'secondary'}
                key={item.id}
                style={{ width: '18rem' }}
                className="mb-2"
            >
                <Card.Header>Order Id: {item.id}</Card.Header>
                <Card.Body>
                    <Card.Title>Instument Id: {item.instrumentId}</Card.Title>
                    <Card.Text>
                        Client Id : {item.clientId}<br/>
                        Price: {item.price}<br/>
                        Quantity: {item.quantity}<br/>
                        Status:{item.status}
                    </Card.Text>
                </Card.Body>
            </Card>
        ));
        return sellOrdersList;
    }

    return (
        <>
            <div className="left">
                <Alert className="head-size" variant={'success'}>
                    Buy Orders
                </Alert>
                {buyOrdersLoad && getBuyOrdersList()}
            </div>
            <div className="right" style={{marginTop:`${top}px`}}>
            <Alert className="head-size" variant={'success'}>
                    Sell Orders
                </Alert>
                {sellOrdersLoad && getSellOrdersList()}
            </div>
        </>
    );
}

export default Stocks;