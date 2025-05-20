import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import DisplayData from "./components/DisplayData";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/display" element={<DisplayData />} />
      </Routes>
    </Router>
  );
}

export default App;
