import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button'
import './Orders.css';

function Orders() {

    //client Data
    const [client, setClient] = useState({ id: '', clientName: ''});

    //Handling Client Data
    const handleClient = (e) => {
        axios.get("http://localhost:8080/client/" + e.target.value)
            .then(res => setClient({ ...res.data }))
            //.then(console.log(client))
            .catch(err => console.log("client error"));
    }

    //Instrument Data
    const [instrument, setInstrument] = useState({ id: '', instrumentName: '', faceValue: '', expiryDate: ''});

    //Handling Instrument Data
    const handleInstrument = (e) => {
        axios.get("http://localhost:8080/instrument/" + e.target.value)
            .then(res => setInstrument({ ...res.data }))
            // .then(console.log(instrument))
            .catch(err => console.log("instrument error"));
    }

    //Price
    const [price,setPrice] = useState('');

    //Handling Price
    const handlePrice = (e) => {
        setPrice(e.target.value)
    }

    //Quantity
    const [quantity,setQuantity] = useState('');

    //Handling Quantity
    const handleQuantity = (e) => {
        setQuantity(e.target.value)
    }

    //Direction -> Buy or Sell
    const [direction, setDirection] = useState('');

    //Handling Buy or Sell Direction
    const handleDirection = (e) => {
        setDirection(e.target.value);
    }

    //Handling Order Submission
    const handleOrder = (e) =>{
        e.preventDefault();
        const result = {
            client,
            instrument,
            price,
            quantity
        }
        if(direction==="BUY")
            axios.post("http://localhost:8080/buy",result)
        if(direction==="SELL")
            axios.post("http://localhost:8080/sell",result)
        console.log(result)
    }

    return (
        <>
            <form>
                <div className="formHeader">
                    <h3>Make Your Order</h3>
                </div>
                <hr />
                <div>
                    <Form.Label>Client Id</Form.Label>
                    <Form.Control className="fieldSize" type="text" onBlur={handleClient} />
                </div>
                <div className="fieldRight">
                    <Form.Label>Client Name</Form.Label>
                    <Form.Control className="fieldSize" type="text" value={client.clientName} readOnly />
                </div>
                <br />
                <div>
                    <Form.Label>Instrument Id</Form.Label>
                    <Form.Select className="fieldSize" onChange={handleInstrument}>
                        <option>Select</option>
                        <option value="1001">1001</option>
                        <option value="1002">1002</option>
                        <option value="1003">1003</option>
                        <option value="1004">1004</option>
                        <option value="1005">1005</option>
                    </Form.Select>
                </div>
                <div className="fieldRight">
                    <Form.Label>Instrument Name</Form.Label>
                    <Form.Control className="fieldSize" type="text" value={instrument.instrumentName} readOnly />
                </div>
                <br />
                <div>
                    <Form.Label>Face Value</Form.Label>
                    <Form.Control className="fieldSize" value={instrument.faceValue} readOnly />
                </div>
                <div className="fieldRight">
                    <Form.Label>Expiry Date</Form.Label>
                    <Form.Control className="fieldSize" value={instrument.expiryDate} readOnly />
                </div>
                <br />
                <div>
                    <Form.Label>Price</Form.Label>
                    <Form.Control className="fieldSize" onBlur={handlePrice} />
                </div>
                <div className="fieldRight">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control className="fieldSize" onBlur={handleQuantity} />
                </div>
                <br />
                <div>
                    <Form.Label>Direction</Form.Label>
                    <Form.Select className="fieldSize" value={direction} onChange={handleDirection}>
                        <option>Select</option>
                        <option value="1001">BUY</option>
                        <option value="1002">SELL</option>
                    </Form.Select>
                </div>
                <div className="btn-section">
                    <Button variant="primary" size="lg" active onClick={handleOrder}>Submit</Button>
                </div>
            </form>
        </>
    );
}

export default Orders;