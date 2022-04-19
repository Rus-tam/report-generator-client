import { Fragment, useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [txtFile, setTxtFile] = useState("");
  const [xlsxFile, setXlsxFile] = useState("");
  const [uploadedFile, setUploadedFile] = useState({});

  const onChange = (e) => {
    const file = e.target.files[0];

    if (file.name.split(".").includes("txt")) {
      setTxtFile(file);
    }
    if (file.name.split(".").includes("xlsx")) {
      setXlsxFile(file);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", txtFile);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { url, fileName } = res.data;

      setUploadedFile({ url, fileName });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="formFile" className="form-label">
            Данные по нагрузкам в формате <b>.txt</b>
          </label>
          <input className="form-control" type="file" id="formFile" onChange={onChange} />
        </div>
        <div className="mb-4">
          <label htmlFor="formFileMultiple" className="form-label">
            Данные по свойствам потоков в формате <b>.xlsx</b>
          </label>
          <input className="form-control" type="file" id="formFileMultiple" onChange={onChange} />
        </div>

        <input type="submit" value="Загрузить" className="btn btn-primary btn-block mt-4" />
      </form>
    </Fragment>
  );
};

export default FileUpload;
