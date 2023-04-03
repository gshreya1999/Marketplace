import React from 'react';
import Navbar from "./components/Navbar"
import Home from "./routes/Home"
import Settings from "./routes/Settings"
import PostAd from "./routes/PostAd"
import { Route, Routes } from "react-router-dom"
function App() {

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<PostAd />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </>
  );
}

export default App;