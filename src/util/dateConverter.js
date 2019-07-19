export default (date) => {
  const idx = date.indexOf('T');
  const idx2 = date.indexOf(':');
  const idx3 = date.indexOf('.');

  const time = date.substring(idx + 1, idx2);

  let setTime = Number(time) + 9;

  if (setTime > 23) setTime -= 24;

  let dateTime = String(setTime);

  if (String(setTime).length === 1) {
    dateTime = '0'.concat(String(setTime));
  }

  const frontDate = date.substring(0, idx);
  const backDate = date.substring(idx2, idx3);

  const resultDate = frontDate
    .concat('         ')
    .concat(dateTime)
    .concat(backDate);

  return resultDate;
};
