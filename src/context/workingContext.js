import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

const WorkingContext = createContext();

export const WorkingProvider = ({ children }) => {
  const [txtUploaded, setTxtUploaded] = useState(false);
  const [xlsxUploaded, setXlsxUploaded] = useState(false);

  return (
    <WorkingContext.Provider value={{ txtUploaded, setTxtUploaded, xlsxUploaded, setXlsxUploaded }}>
      {children}
    </WorkingContext.Provider>
  );
};

WorkingProvider.propTypes = {
  children: PropTypes.any,
};

export default WorkingContext;
