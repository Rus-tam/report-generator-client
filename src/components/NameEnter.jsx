import React from "react";
import { useNavigate } from "react-router-dom";

const NameEnter = () => {
  const navigate = useNavigate();

  const saveName = (e) => {
    e.preventDefault();
    const regexp = /^[a-z\s]+$/i;
    const name = e.target[0].value.toLowerCase().trim();
    localStorage.setItem("Name", name);

    if (!regexp.test(name)) {
      alert("Ну я же просил имя на латинице!");
    } else if (name === "gulshat") {
      alert("Привет, Гульшатик!");
      navigate("/");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="d-flex align-items-center">
      <div className="container mt-4">
        <div className="row text-center align-middle">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <form onSubmit={saveName}>
              <div>
                <label className="form-label" htmlFor="nameForm">
                  <b>Введите свое имя литиницей</b>
                </label>
                <input className="form-control" type="text" id="nameForm" />
              </div>

              <button type="Submit" className="btn btn-primary mt-4">
                Ввести
              </button>
            </form>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </div>
  );
};

export default NameEnter;
