import React from "react";
import TxtFileUpload from "./FileUploadFragment/TxtFileUpload";
import XlsxFileUpload from "./FileUploadFragment/XlsxFileUpload";

const FileUpload = () => {
  return (
    <div className="mb-4">
      <TxtFileUpload />
      <XlsxFileUpload />
    </div>
  );
};

export default FileUpload;
