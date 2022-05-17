const makeArrayStreamMassFlow = (obj, prop) => {
  const arr = [];
  const sortedArr = [];
  const streams = Object.keys(obj);
  const stages = Object.values(obj);
  for (let i = 0; i < streams.length; i++) {
    arr.push({
      stream: streams[i],
      stage: stages[i],
      property: prop[streams[i]],
    });
  }

  console.log(arr);

  // Сортируем элементы массива
  for (let elem of arr) {
    if (elem.stage.includes("Condenser")) {
      sortedArr.push(elem);
    } else if (!elem.stage.includes("Condenser") && !elem.stage.includes("Reboiler")) {
    }
  }

  return sortedArr;
};

export default makeArrayStreamMassFlow;
