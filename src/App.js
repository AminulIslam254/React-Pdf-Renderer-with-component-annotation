import React from "react";

import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import Documents from "./components/Documents";
import Pages from "./components/Pages";



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Documents />} />
        </Routes>
        <Routes>
          <Route exact path="/Pages/:id" element={<Pages />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
