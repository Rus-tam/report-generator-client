import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkingContext from "../context/workingContext";

import TxtFileUpload from "./FileUploadFragment/TxtFileUpload";
import XlsxFileUpload from "./FileUploadFragment/XlsxFileUpload";
import NavBar from "./layout/Navbar";

const FileUpload = () => {
  let name = "";
  const { mainBtnDisabled } = useContext(WorkingContext);

  const navigate = useNavigate();

  useEffect(() => {
    name = localStorage.getItem("Name");
    name === null ? navigate("/enter-name") : null;
  }, []);

  const startAnalyze = () => {
    navigate("/results");
  };

  return (
    <div>
      <NavBar />
      <div className="d-flex align-items-center">
        <div className="container mt-4">
          <div className="row text-center align-middle mb-4">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <TxtFileUpload />
              <XlsxFileUpload />

              <button
                type="button"
                className="btn btn-primary btn-lg mt-4"
                disabled={!mainBtnDisabled}
                onClick={startAnalyze}
              >
                Начать анализ
              </button>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
