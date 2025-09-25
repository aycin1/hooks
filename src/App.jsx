import { Route, Routes } from "react-router";
import "./App.css";
import Feed from "./components/Feed";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Lists from "./components/Lists/Lists";
import Login from "./components/Login";
import PatternPage from "./components/PatternPage";
import Profile from "./components/Profile";
import Register from "./components/Register";
import RequireAuth from "./components/RequireAuth";
import Search from "./components/Search/Search";
import User from "./components/User/User";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="/lists" element={<Lists />} />
            <Route path="/search" element={<Search />} />
            <Route path="/pattern/:id" element={<PatternPage />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user/:username" element={<User />} />
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
