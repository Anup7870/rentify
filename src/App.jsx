import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import DashBoard from "./pages/DashBoard.jsx";
import Home from "./pages/Home.jsx";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashBoard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
