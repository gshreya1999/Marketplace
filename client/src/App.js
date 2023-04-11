import React from 'react';
import Navbar from "./components/Navbar"
import Home from "./routes/Home"
import Settings from "./routes/Settings"
import PostAd from "./routes/PostAd"
import { Route, Routes } from "react-router-dom"
import TransactionsInfo from './routes/TransactionsInfo';
import Login from './routes/Login';
import Signup from './routes/SignUp';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/post" element={<PostAd />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/transactions" element={<TransactionsInfo />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
