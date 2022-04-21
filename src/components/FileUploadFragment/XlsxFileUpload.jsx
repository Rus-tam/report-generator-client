import React, { Fragment, useContext } from "react";
import WorkingContext from "../../context/workingContext";

const XlsxFileUpload = () => {
  const { isXlsxSelected, onChange, xlsxStatusColor, onSubmit, xlsxStatus } = useContext(WorkingContext);

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <div className="mt-4 mb-4">
          <label htmlFor="formFileMultiple" className="form-label">
            Загрузите данные по потокам в форматe <b>.xlsx</b>
          </label>
          <input className="form-control" type="file" id="formFileMultiple" onChange={onChange} />
        </div>

        <p className={xlsxStatusColor}>
          <b>{xlsxStatus}</b>
        </p>

        <button type="submit" className="btn btn-primary btn-block mt-4" disabled={!isXlsxSelected}>
          Загрузить
        </button>
      </form>
    </Fragment>
  );
};

export default XlsxFileUpload;
