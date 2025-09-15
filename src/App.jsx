import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Register from "./Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
