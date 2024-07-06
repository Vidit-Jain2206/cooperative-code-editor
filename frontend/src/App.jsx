import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Code from "./pages/Code";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/code" element={<Code />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
