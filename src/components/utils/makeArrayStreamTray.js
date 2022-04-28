const makeArrayStreamTray = (obj) => {
  const result = [];
  const keys = Object.keys(obj);
  const values = Object.values(obj);

  keys.forEach((key, index) => {
    result.push({
      key: key,
      value: values[index],
    });
  });

  return result;
};

export default makeArrayStreamTray;
