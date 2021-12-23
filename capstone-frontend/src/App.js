import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Orders from './components/Orders';
import { Routes, Route } from 'react-router';

function App() {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/orders" element={<Orders/>}/>
      </Routes>
    </div>
  );
}

export default App;
