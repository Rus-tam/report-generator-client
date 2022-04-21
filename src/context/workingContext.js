import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const WorkingContext = createContext();

export const WorkingProvider = ({ children }) => {
  // File Upload
  const [txtUploaded, setTxtUploaded] = useState(false);
  const [xlsxUploaded, setXlsxUploaded] = useState(false);
  const [txtStatusColor, setTxtStatusColor] = useState("bg-warning");
  const [xlsxStatusColor, setXlsxStatusColor] = useState("bg-warning");
  const [txtStatus, setTxtStatus] = useState("Файл с нагрузками ВКУ не загружен");
  const [xlsxStatus, setXlsxStatus] = useState("Файл с данными по потокам не загружен");
  const [file, setFile] = useState("");
  const [isTxtSelected, setIsTxtSelected] = useState(false);
  const [isXlsxSelected, setIsXlsxSelected] = useState(false);

  const [mainBtnDisabled, setMainBtnDisabled] = useState(false);

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

  useEffect(() => {
    txtUploaded && xlsxUploaded ? setMainBtnDisabled(true) : null;
  }, [txtUploaded && xlsxUploaded]);

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
        mainBtnDisabled,
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
