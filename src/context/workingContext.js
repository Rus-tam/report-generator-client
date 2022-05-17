import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const WorkingContext = createContext();

export const WorkingProvider = ({ children }) => {
  // Send user name
  const sendName = async (name) => {
    try {
      const nameSendingStatus = await axios.post("http://localhost:5000/get-name", {
        userName: name,
      });
      if (nameSendingStatus.status === 201) {
        return 201;
      } else {
        return 403;
      }
    } catch (e) {
      null;
    }
  };

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

  const [formDisabled, setFormDisabled] = useState(true);

  const [mainBtnDisabled, setMainBtnDisabled] = useState(false);

  const onChangeTxt = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile.name.split(".").pop() === "txt") {
      setFile(selectedFile);
      setIsTxtSelected(true);
    } else if (selectedFile.name.split(".").pop() === "xlsx") {
      alert("Сюда можно вставить только файл формата .txt");
      e.target.value = "";
    } else {
      alert(`Приложение не поддерживает файлы формата .${selectedFile.name.split(".").pop()}`);
      e.target.value = "";
    }
  };

  const onChangeXlsx = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile.name.split(".").pop() === "xlsx") {
      setFile(selectedFile);
      setIsXlsxSelected(true);
    } else if (selectedFile.name.split(".").pop() === "txt") {
      alert("Сюда можно вставить только файл формата .xlsx");
      e.target.value = "";
    } else {
      alert(`Приложение не поддерживает файлы формата .${selectedFile.name.split(".").pop()}`);
      e.target.value = "";
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", file);

    // Поиск имени пользователя
    const name = localStorage.getItem("Name");

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Name: name,
        },
      });

      if (response.status === 200 && isTxtSelected && file.name.split(".").pop() === "txt") {
        setTxtUploaded(true);
        setTxtStatusColor("bg-success");
        setTxtStatus("Файл с нагрузками ВКУ успешно загружен");
        setIsTxtSelected(txtUploaded); // Выключаем кнопку после загрузки файла
        setFormDisabled(false);
      }

      if (response.status === 200 && isXlsxSelected && file.name.split(".").pop() === "xlsx") {
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

  // Получить все данные с сервера
  const [allData, setAllData] = useState();

  const getAllData = async () => {
    const name = localStorage.getItem("Name");
    const response = await axios.get("http://localhost:5000/", {
      headers: {
        Name: name,
      },
    });

    if (response.status === 200) {
      setAllData(response.data);
    } else {
      alert("Сервер лежит, поди и ты полежи");
    }
  };

  // Модальное окно
  const [feedModal, setFeedModal] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShowFeed = () => {
    setShow(true);
    setFeedModal(true);
  };
  const handleShowDraw = () => {
    setShow(true);
    setFeedModal(false);
  };

  let selectedStreams = [];

  let selectedFeedStreams = localStorage.getItem("FeedStreams").split(",");
  let selectedDrawStreams = localStorage.getItem("DrawStreams").split(",");

  const handleChange = (e) => {
    if (feedModal) {
      if (e.target.checked) {
        selectedFeedStreams.push(e.target.id);
      } else if (!e.target.checked) {
        selectedFeedStreams = selectedFeedStreams.filter((stream) => stream !== e.target.id);
      }
    } else {
      if (e.target.checked) {
        selectedDrawStreams.push(e.target.id);
      } else if (!e.target.checked) {
        selectedDrawStreams = selectedDrawStreams.filter((stream) => stream !== e.target.id);
      }
    }
  };

  const handleSelect = () => {
    if (feedModal) {
      localStorage.setItem("FeedStreams", selectedFeedStreams);
      handleClose();
    } else {
      localStorage.setItem("DrawStreams", selectedDrawStreams);
      handleClose();
    }
  };

  // Сгенерировать отчет и скачать файл
  const downloadFile = async () => {
    const name = localStorage.getItem("Name");
    try {
      const responseGet = await fetch("http://localhost:5000/download", {
        headers: {
          Name: name,
        },
      });

      if (responseGet.status === 200) {
        const blob = await responseGet.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "column_info.xlsx";
        document.getElementById("resultObservePage").appendChild(link);
        link.click();
        link.remove();
      }
    } catch (Error) {
      console.log(Error);
    }
  };
  const handleGenerateRep = async (e) => {
    e.stopPropagation();
    const name = localStorage.getItem("Name");

    try {
      const responsePost = await axios.post(
        "http://localhost:5000/",
        {
          addFeedStreams: localStorage.getItem("FeedStreams").split(","),
          addDrawStreams: localStorage.getItem("DrawStreams").split(","),
        },
        {
          headers: {
            Name: name,
          },
        },
      );
    } catch (Error) {
      console.log(Error);
    }

    // Скачать файл
    downloadFile();

    // Очищаем localStorage
    localStorage.setItem("FeedStreams", "");
    localStorage.setItem("DrawStreams", "");
  };

  return (
    <WorkingContext.Provider
      value={{
        sendName,
        onSubmit,
        txtStatusColor,
        isTxtSelected,
        txtStatus,
        isXlsxSelected,
        xlsxStatusColor,
        xlsxStatus,
        mainBtnDisabled,
        onChangeXlsx,
        onChangeTxt,
        formDisabled,
        getAllData,
        allData,
        show,
        handleClose,
        handleShowFeed,
        handleChange,
        selectedStreams,
        handleSelect,
        handleShowDraw,
        feedModal,
        handleGenerateRep,
        selectedFeedStreams,
        selectedDrawStreams,
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
