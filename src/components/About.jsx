import React, { useEffect } from "react";
import NavBar from "./layout/Navbar";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const name = localStorage.getItem("Name");

    name === null ? navigate("/enter-name") : null;
  }, []);

  return (
    <div>
      <NavBar />
      <div>
        <h1>About page</h1>
      </div>
    </div>
  );
};

export default About;
