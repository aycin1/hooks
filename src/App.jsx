import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Register from "./components/Register";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route
            path="*"
            element //404 page
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
