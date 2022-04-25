import React, { Fragment, useContext } from "react";
import WorkingContext from "../../context/workingContext";

const TxtFileUpload = () => {
  const { onChangeTxt, isTxtSelected, onSubmit, txtStatusColor, txtStatus } = useContext(WorkingContext);

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="formFileMultiple" className="form-label">
            Загрузите данные по нагрузкам в формате <b>.txt</b>
          </label>
          <input className="form-control" type="file" id="formFileMultiple" onChange={onChangeTxt} />
        </div>

        <p className={txtStatusColor}>
          <b>{txtStatus}</b>
        </p>

        <button type="submit" className="btn btn-primary btn-block mt-4" disabled={!isTxtSelected}>
          Загрузить
        </button>
      </form>
    </Fragment>
  );
};

export default TxtFileUpload;
