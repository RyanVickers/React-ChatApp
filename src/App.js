import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route exact path="/register" element={<Register/>}/>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/" element={<Home/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
