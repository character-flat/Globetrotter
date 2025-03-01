import React from "react";
import Home from "../src/src/pages/Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Invite from '../src/src/pages/Invite';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/invite" element={<Invite />} />

        </Routes>
      </BrowserRouter>
      </div>
    );
  }


export default App;
