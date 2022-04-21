import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const WorkingContext = createContext();

export const WorkingProvider = ({ children }) => {
  const [txtUploaded, setTxtUploaded] = useState(false);
  const [xlsxUploaded, setXlsxUploaded] = useState(false);
  const [txtStatusColor, setTxtStatusColor] = useState("bg-warning");
  const [xlsxStatusColor, setXlsxStatusColor] = useState("bg-warning");
  const [txtStatus, setTxtStatus] = useState("Файл с нагрузками ВКУ не загружен");
  const [xlsxStatus, setXlsxStatus] = useState("Файл с данными по потокам не загружен");

  // Experimental
  const [file, setFile] = useState("");
  const [isTxtSelected, setIsTxtSelected] = useState(false);
  let [isXlsxSelected, setIsXlsxSelected] = useState(false);

  const onChange = (e) => {
    const file = e.target.files[0];

    if (file.name.split(".").pop() === "txt") {
      setFile(file);
      setIsTxtSelected(true);
    } else if (file.name.split(".").pop() === "xlsx") {
      setFile(file);
      setIsXlsxSelected(true);
    } else {
      alert(`Приложение не поддерживает файлы формата .${file.name.split(".").pop()}`);
      e.target.value = "";
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 && isTxtSelected) {
        setTxtUploaded(true);
        setTxtStatusColor("bg-success");
        setTxtStatus("Файл с нагрузками ВКУ успешно загружен");
        setIsTxtSelected(txtUploaded); // Выключаем кнопку после загрузки файла
      }

      if (response.status === 200 && isXlsxSelected) {
        setXlsxUploaded(true);
        setXlsxStatusColor("bg-success");
        setXlsxStatus("Файл с данными по потокам успешно загружен");
        setIsXlsxSelected(xlsxUploaded); // Выключаем кнопку после загрузки файла
      }
    } catch (e) {
      alert("Что-то прошло не так. Зовите Рустама он все починит");
    }
  };

  return (
    <WorkingContext.Provider
      value={{
        onChange,
        onSubmit,
        txtStatusColor,
        isTxtSelected,
        txtStatus,
        isXlsxSelected,
        xlsxStatusColor,
        xlsxStatus,
      }}
    >
      {children}
    </WorkingContext.Provider>
  );
};

WorkingProvider.propTypes = {
  children: PropTypes.any,
};

export default WorkingContext;
