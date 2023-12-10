import moment from "moment-jalaali";

export function convertUnixTimeStampToDate(timestamp) {
  const converback = moment.unix(timestamp).format("jYYYY/jMM/jDD");
  return converback;
}

export function convertUnixTimeStampToDateTime(timestamp) {
  const converback = moment
    .unix(timestamp / 1000)
    .format("HH:mm - jYYYY/jMM/jDD");
  return converback;
}
