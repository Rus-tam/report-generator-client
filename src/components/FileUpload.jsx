import React from "react";
import TxtFileUpload from "./FileUploadFragment/TxtFileUpload";
import XlsxFileUpload from "./FileUploadFragment/XlsxFileUpload";

const FileUpload = () => {
  return (
    <div className="mb-4 text-center">
      <h1 className="display-4 text-center mb-4">Добро пожаловать в генератор отчетов</h1>

      <TxtFileUpload />
      <XlsxFileUpload />

      <button type="button" className="btn btn-primary btn-lg mt-4">
        Начать анализ
      </button>
    </div>
  );
};

export default FileUpload;
