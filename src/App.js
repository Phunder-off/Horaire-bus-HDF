import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule"

function App() {
  return (
    <BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/horaires" element={<Schedule />} />
			</Routes>
		</BrowserRouter>
  );
}

export default App;
