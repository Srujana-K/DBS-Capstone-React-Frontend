import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import './Orders.css';

function Orders() {

    //client Data
    const [client, setClient] = useState({ id: '', clientName: '' });
    const [clientError, setClientError] = useState(false);

    //Handling Client Data
    const handleClient = (e) => {
        setClient({ id: '', clientName: '' })
        setClientError(false);
        axios.get("http://localhost:8080/client/" + e.target.value)
            .then(res => setClient({ ...res.data }))
            //.then(console.log(client))
            .catch(err => {
                setClientError(true)
                console.log("client error")
            });
    }

    //Instrument Data
    const [instrument, setInstrument] = useState({ id: '', instrumentName: '', faceValue: '', expiryDate: '' });

    //Handling Instrument Data
    const handleInstrument = (e) => {
        setInstrument({ id: '', instrumentName: '', faceValue: '', expiryDate: '' });
        axios.get("http://localhost:8080/instrument/" + e.target.value)
            .then(res => setInstrument({ ...res.data }))
            // .then(console.log(instrument))
            .catch(err => console.log("instrument error"));
    }

    //Price
    const [price, setPrice] = useState('');
    const [priceError, setPriceError] = useState(false);

    //Handling Price
    const handlePrice = (e) => {
        setPriceError(false);
        if(e.target.value <= 0.12*instrument.faceValue)
            setPriceError(true)
        setPrice(e.target.value)
    }

    //Quantity
    const [quantity, setQuantity] = useState('');
    const [quantityError, setQuantityError] = useState(false);

    //Handling Quantity
    const handleQuantity = (e) => {
        setQuantityError(false)
        if(e.target.value%25!=0)
            setQuantityError(true)
        setQuantity(e.target.value)
    }

    //Direction -> Buy or Sell
    const [direction, setDirection] = useState('');

    //Handling Buy or Sell Direction
    const handleDirection = (e) => {
       // console.log(direction)
        setDirection(e.target.value);
    }

    //Handling Order Submission
    const handleOrder = (e) => {
        e.preventDefault();
        if(client.id=='' || clientError || instrument.id=='' || direction=='Select' ||price=='' ||quantity==''||priceError||quantityError){
            alert("All Fields are Mandatory and Ensure with Correct Data");
            return;
        }
        const result = {
            clientId: client.id,
            instrumentId: instrument.id,
            orderDirection: direction,
            price,
            quantity
        }
        axios.post("http://localhost:8080/orders", result)
        console.log(result)
    }

    return (
        <>
            <form>
                <div className="formHeader">
                    <h3>Place Your Order</h3>
                </div>
                <hr />
                <div>
                    <Form.Label>Client Id</Form.Label>
                    <Form.Control className="fieldSize" type="text" onBlur={handleClient} />
                    {
                        clientError && 
                        <Alert variant='danger' className="alert">
                            Client Id Not Found
                        </Alert>
                    }   
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
                    <Form.Control className="fieldSize" onChange={handlePrice} />
                    {   
                        priceError && 
                        <Alert variant='danger' id="alert-lg" className="alert">
                            Price must be atleast 12% of Face value ({0.12*instrument.faceValue})!!
                        </Alert>
                    }
                </div>
                <div className="fieldRight">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control className="fieldSize" onChange={handleQuantity} />
                    {
                        quantityError &&
                        <Alert variant='danger' className="alert">
                            Quantity must be multiple of 25!!
                        </Alert>
                    }
                </div>
                <br />
                <div>
                    <Form.Label>Direction</Form.Label>
                    <Form.Select className="fieldSize" value={direction} onChange={handleDirection}>
                        <option>Select</option>
                        <option value="BUY">BUY</option>
                        <option value="SELL">SELL</option>
                    </Form.Select>
                </div>
                <div className="btn-section">
                    <Button variant="dark" active onClick={handleOrder}><b>Submit</b></Button>
                </div>
            </form>
        </>
    );
}

export default Orders;