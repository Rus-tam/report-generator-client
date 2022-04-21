import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const WorkingContext = createContext();

export const WorkingProvider = ({ children }) => {
  // Txt file upload
  const [txtFile, setTxtFile] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [txtUploaded, setTxtUploaded] = useState(false);
  const [textColor, setTextColor] = useState("bg-warning");
  const [txtStatus, setTxtStatus] = useState("Файл не загружен");

  const onChangeTxt = (e) => {
    const file = e.target.files[0];

    if (file.name.split(".").pop() === "txt") {
      setTxtFile(file);
      setIsSelected(true);
    } else {
      alert(`Приложение не поддерживает файлы формата .${file.name.split(".").pop()}`);
      e.target.value = "";
    }
  };

  const onSubmitTxt = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", txtFile);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        setTxtUploaded(true);
        setTextColor("bg-success");
        setTxtStatus("Файл успешно загружен");
      }

      setIsSelected(!txtUploaded);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <WorkingContext.Provider value={{ onChangeTxt, onSubmitTxt, textColor, isSelected, txtStatus }}>
      {children}
    </WorkingContext.Provider>
  );
};

WorkingProvider.propTypes = {
  children: PropTypes.any,
};

export default WorkingContext;
