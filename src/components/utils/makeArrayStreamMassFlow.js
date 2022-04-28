const makeArrayStreamMassFlow = (obj, prop) => {
  const result = [];
  const streams = Object.keys(obj);
  for (let i = 0; i < streams.length; i++) {
    result.push({
      stream: streams[i],
      properties: prop[streams[i]],
    });
  }

  return result;
};

export default makeArrayStreamMassFlow;
