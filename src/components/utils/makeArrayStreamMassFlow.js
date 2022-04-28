const makeArrayStreamMassFlow = (obj, prop) => {
  const result = [];
  const streams = Object.keys(obj);
  //   console.log("streams", streams);
  //   console.log("gkgkgk", prop["5"]);
  for (let i = 0; i < streams.length; i++) {
    console.log(prop[streams[i]]);
  }
};

export default makeArrayStreamMassFlow;
