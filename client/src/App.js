import { useContext } from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/Messenger/Messenger";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/messenger"
            // element={user ? <Messenger /> : <Navigate to="/login" />}
            element={<Messenger />}
          />
          <Route
            path="/profile/:userId"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to={"/"} />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to={"/"} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
