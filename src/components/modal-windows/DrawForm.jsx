import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import WorkingContext from "../../context/workingContext";

const DrawForm = () => {
  const { allData, selectedDrawStreams, handleChange } = useContext(WorkingContext);

  const allStreams = allData.excelData.allStreams;

  return (
    <div>
      {allStreams.map((stream) => (
        <Form.Check
          inline
          label={stream}
          name="group"
          type="checkbox"
          id={stream}
          key={stream}
          defaultChecked={selectedDrawStreams.includes(stream)}
          className="mb-4"
          onChange={handleChange}
        />
      ))}
    </div>
  );
};

export default DrawForm;
