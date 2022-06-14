const makeArrayStreamMassFlow = (obj, prop, colNumb) => {
  const arr = [];
  let streams = Object.keys(obj);
  const stages = Object.values(obj);
  for (let i = 0; i < streams.length; i++) {
    prop[streams[i]] === undefined ? streams[i] = streams[i] + ' ' + '@' + colNumb : null;
    arr.push({
      stream: streams[i],
      stage: stages[i],
      property: prop[streams[i]],
    });
  }

  return arr;
};

export default makeArrayStreamMassFlow;
