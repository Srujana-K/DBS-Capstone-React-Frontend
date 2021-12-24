import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import Home from './home/Home';
import Orders from './components/Orders';
import Stocks from './components/stocks/Stocks';
import Dashboard from './components/dashboard/Dashboard';
import { Routes, Route } from 'react-router';

function App() {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/stocks" element={<Stocks/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;
