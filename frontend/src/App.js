import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Header from './components/Header'

import "./index.css";

function App() {
  return (
    <>
      <Router>
        <div className="container">
         <Header></Header>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App;
