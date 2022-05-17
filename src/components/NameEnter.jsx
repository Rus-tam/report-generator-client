import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import WorkingContext from "../context/workingContext";
import NavBar from "./layout/Navbar";

const NameEnter = () => {
  const navigate = useNavigate();

  const { sendName } = useContext(WorkingContext);

  const saveName = async (e) => {
    e.preventDefault();
    const regexp = /^[a-z\s]+$/i;
    const name = e.target[0].value.toLowerCase().trim();
    const status = await sendName(name);

    if (status !== 201) {
      alert("Это имя уже занято!");
    } else {
      localStorage.setItem("Name", name);
    }

    if (!regexp.test(name)) {
      alert("Ну я же просил имя на латинице!");
    } else if (name === "gulshat") {
      alert("Привет, Гульшатик!");
      navigate("/");
    } else if (name === "amina") {
      alert("Привет, Амина! Сделай себе кофе, расслабься, а я в это время займусь отчетами");
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="d-flex align-items-center">
        <div className="container mt-4">
          <div className="row text-center align-middle">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <form onSubmit={saveName}>
                <div>
                  <label className="form-label" htmlFor="nameForm">
                    <b>Введите свое имя латиницей</b>
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
    </div>
  );
};

export default NameEnter;
