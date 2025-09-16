import { Route, Routes } from "react-router";
import "./App.css";
import Feed from "./components/Feed";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";
import RequireAuth from "./components/RequireAuth";
import Search from "./components/Search";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<Search />} />
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
