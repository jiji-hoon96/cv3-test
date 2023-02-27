const makeTime = (time) => {
  const year = parseInt("20" + time.substr(0, 2));
  const month = time.substr(2, 2);
  const day = time.substr(4, 2);
  const hour = time.substr(6, 2);
  const minute = time.substr(8, 2);
  const formattedTime = `${year}.${month}.${day} ${hour}:${minute}`;
  return `${formattedTime}`;
};

export default makeTime;
