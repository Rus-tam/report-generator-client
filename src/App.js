import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FileUpload from "./components/FileUpload";
import NameEnter from "./components/NameEnter";
import ResultObserve from "./components/ResultObserve";
import About from "./components/About";
import Error from "./components/Error";
import { WorkingProvider } from "./context/workingContext";

const App = () => {
  return (
    <WorkingProvider>
      <Router>
        <div className="container mt-4">
          <Routes>
            <Route exact path="/" element={<FileUpload />}></Route>
            <Route path="/results" element={<ResultObserve />}></Route>
            <Route path="/enter-name" element={<NameEnter />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/error" element={<Error />}></Route>
          </Routes>
        </div>
      </Router>
    </WorkingProvider>
  );
};

export default App;
