import { Route, Routes } from "react-router";
import "./App.css";
import Layout from "./components/Layout";
import Register from "./components/Register";
import RequireAuth from "./components/RequireAuth";
import Feed from "./pages/Feed/Feed";
import Home from "./pages/Home/Home";
import Lists from "./pages/Lists/Lists";
import Login from "./pages/Login/Login";
import Pattern from "./pages/Pattern/Pattern";
import Profile from "./pages/Profile/Profile";
import Search from "./pages/Search/Search";
import User from "./pages/User/User";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/search" element={<Search />} />
          <Route path="/pattern/:id" element={<Pattern />} />
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
  );
}

export default App;
