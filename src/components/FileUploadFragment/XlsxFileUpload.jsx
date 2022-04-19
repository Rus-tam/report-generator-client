import React, { Fragment, useState } from "react";
import axios from "axios";

const XlsxFileUpload = () => {
  const [xlsxFile, setXlsxFile] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  // const [uploadedFile, setUploadedFile] = useState({});

  const onChange = (e) => {
    const file = e.target.files[0];

    if (file.name.split(".").pop() === "xlsx") {
      setXlsxFile(file);
      setIsSelected(true);
    } else {
      alert(`Приложение не поддерживает файлы формата .${file.name.split(".").pop()}`);
      e.target.value = "";
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", xlsxFile);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data);

      const { name, url } = res.data[0];

      console.log(url);
      console.log(name);

      // setUploadedFile({ url, fileName });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <div className="mt-4 mb-4">
          <label htmlFor="formFileMultiple" className="form-label">
            Загрузите данные по потокам в форматe <b>.xlsx</b>
          </label>
          <input className="form-control" type="file" id="formFileMultiple" onChange={onChange} />
        </div>

        <input type="submit" value="Загрузить" className="btn btn-primary btn-block mt-4" disabled={!isSelected} />
      </form>
    </Fragment>
  );
};

export default XlsxFileUpload;