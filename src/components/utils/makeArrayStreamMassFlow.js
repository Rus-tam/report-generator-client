const makeArrayStreamMassFlow = (obj, prop) => {
  const result = [];
  const streams = Object.keys(obj);
  const stages = Object.values(obj);
  for (let i = 0; i < streams.length; i++) {
    result.push({
      stream: streams[i],
      stage: stages[i],
      property: prop[streams[i]],
    });
  }

  return result;
};

export default makeArrayStreamMassFlow;
