import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FileUpload from "./components/FileUpload";
import ResultObserve from "./components/resultObserve";
import { WorkingProvider } from "./context/workingContext";

const App = () => {
  return (
    <WorkingProvider>
      <Router>
        <div className="container mt-4">
          <Routes>
            <Route exact path="/" element={<FileUpload />}></Route>
            <Route path="/results" element={<ResultObserve />}></Route>
          </Routes>
        </div>
      </Router>
    </WorkingProvider>
  );
};

export default App;
