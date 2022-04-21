import React, { useContext } from "react";
import WorkingContext from "../context/workingContext";

import TxtFileUpload from "./FileUploadFragment/TxtFileUpload";
import XlsxFileUpload from "./FileUploadFragment/XlsxFileUpload";

const FileUpload = () => {
  const { mainBtnDisabled } = useContext(WorkingContext);

  return (
    <div className="mb-4 text-center">
      <h1 className="display-4 text-center mb-4">Добро пожаловать в генератор отчетов</h1>

      <TxtFileUpload />
      <XlsxFileUpload />

      <button type="button" className="btn btn-primary btn-lg mt-4" disabled={!mainBtnDisabled}>
        Начать анализ
      </button>
    </div>
  );
};

export default FileUpload;
