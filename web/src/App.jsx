import { useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";

const App = () => {
  const containerRef = useRef(null);

  const options = {
    smooth: true,
  };

  return (
    <LocomotiveScrollProvider options={options} containerRef={containerRef}>
      <Router>
        <main className="bg-[#1e1e20]" data-scroll-container ref={containerRef}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            {/* <Route path="/dash" element={<Dash/>} /> */}
            {/* Add more routes as needed */}
          </Routes>
        </main>
      </Router>
    </LocomotiveScrollProvider>
  );
};

export default App;
