import React, { Fragment, useState, useContext } from "react";
import WorkingContext from "../../context/workingContext";

const TxtFileUpload = () => {
  const { onChangeTxt, isSelected, onSubmitTxt, textColor, txtStatus } = useContext(WorkingContext);

  return (
    <Fragment>
      <form onSubmit={onSubmitTxt}>
        <div className="mb-4">
          <label htmlFor="formFileMultiple" className="form-label">
            Загрузите данные по нагрузкам в формате <b>.txt</b>
          </label>
          <input className="form-control" type="file" id="formFileMultiple" onChange={onChangeTxt} />
        </div>

        <p className={textColor}>
          <b>{txtStatus}</b>
        </p>

        <button type="submit" className="btn btn-primary btn-block mt-4" disabled={!isSelected}>
          Загрузить
        </button>
      </form>
    </Fragment>
  );
};

export default TxtFileUpload;
