import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import AuthProvider from './context/auth';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route exact path="/" element={<PrivateRoute><Home/></PrivateRoute>}/> 
      <Route exact path="/register" element={<Register/>}/>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>}/>
    </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
