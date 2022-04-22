import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkingContext from "../context/workingContext";

import TxtFileUpload from "./FileUploadFragment/TxtFileUpload";
import XlsxFileUpload from "./FileUploadFragment/XlsxFileUpload";

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
    <div className="mb-4 text-center">
      <h1 className="display-4 text-center mb-4">Добро пожаловать в генератор отчетов</h1>

      <TxtFileUpload />
      <XlsxFileUpload />

      <button type="button" className="btn btn-primary btn-lg mt-4" disabled={!mainBtnDisabled} onClick={startAnalyze}>
        Начать анализ
      </button>
    </div>
  );
};

export default FileUpload;
