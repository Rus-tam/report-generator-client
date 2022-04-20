import React from "react";
import TxtFileUpload from "./FileUploadFragment/TxtFileUpload";
import XlsxFileUpload from "./FileUploadFragment/XlsxFileUpload";

const FileUpload = () => {
  return (
    <div className="mb-4 text-center">
      <TxtFileUpload />
      <XlsxFileUpload />

      <button type="button" className="btn btn-primary btn-lg mt-4">
        Начать анализ
      </button>
    </div>
  );
};

export default FileUpload;
