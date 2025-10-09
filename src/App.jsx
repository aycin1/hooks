import { Route, Routes } from "react-router";
import Layout from "./components/Layout/Layout";
import RequireAuth from "./components/RequireAuth";
import Error from "./pages/Error/Error";
import Feed from "./pages/Feed/Feed";
import Home from "./pages/Home/Home";
import Lists from "./pages/Lists/Lists";
import Login from "./pages/Login/Login";
import Pattern from "./pages/Pattern/Pattern";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import Search from "./pages/Search/Search";

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
          <Route path="/profile/:username" element={<Profile />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
