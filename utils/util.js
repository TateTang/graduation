const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}
/*
 * 时间戳转换为hh:mm 格式  formatDate()
 * 
 * inputTime   时间戳
 */
function formatTimeTwo(inputTime) {
  var date = new Date(inputTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return h + ':' + minute;
};
/*
 * 时间戳转换为年月日 格式  formatDate()
 * 
 * inputTime   时间戳
 */
function formatTimeThree(inputTime) {
  var date = new Date(inputTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d;
};
/*
 * 时间戳转换为时分秒 格式  formatDate()
 * 
 * inputTime   时间戳
 */
function formatTimeFour(inputTime) {
  var date = new Date(inputTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return h + ':' + minute + ':' + second;
};
/*
 * 时间戳转换为年月日  时分秒 格式  formatDate()
 * 
 * inputTime   时间戳
 */
function formatTimeFive(inputTime) {
  var date = new Date(inputTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return y + '/' + m + '/' + d + ' ' + h + ':' + minute + ':' + second;;
};

function changeDateFormat(cellval) {
  var date = new Date(parseInt(cellval.replace("/Date(", "").replace(")/", ""), 10));
  var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  return date.getFullYear() + "-" + month + "-" + currentDate;
};
/**
 * Thu Mar 19 2015 12:00:00 GMT+0800 (中国标准时间) 转换成 
 * 2015-3-19 12:00:00
 */
var formatDateNew = function(date) {
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  var minute = date.getMinutes();
  minute = minute < 10 ? ('0' + minute) : minute;
  var second = date.getSeconds();
  second = second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}
/**
 * 2019-01-03T00:18:21.000+0000转化成正常格式
 * 2019-01-30 2:02:20
 */
function renderTime(date) {
  var dateee = new Date(date).toJSON();
  console.log(dateee);
  return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}
/**
 * 返回时分秒
 * 首先日期对象化后转换为时间戳，
 * 供时间原生方法进行赋值取值，并进行最后对拼接
 */
function formatDateOne(date) {
  let time = new Date(Date.parse(date));
  time.setTime(time.setHours(time.getHours() + 8));
  // alert(time);
  // if (!isNaN(time)) {
  //     return new Date(Date.parse(date.replace(/-/g, "/")));
  // } else {
  let Y = time.getFullYear() + '-';
  let M = addZero(time.getMonth() + 1) + '-';
  let D = addZero(time.getDate()) + ' ';
  let h = addZero(time.getHours()) + ':';
  let m = addZero(time.getMinutes()) + ':';
  let s = addZero(time.getSeconds());
  return Y + M + D + h + m + s;
  // }
}
/**
 * 返回年月日 
 */
function formatDateTwo(date) {
  let time = new Date(Date.parse(date));
  time.setTime(time.setHours(time.getHours() + 8));
  // alert(time);
  // if (!isNaN(time)) {
  //     return new Date(Date.parse(date.replace(/-/g, "/")));
  // } else {
  let Y = time.getFullYear() + '-';
  let M = addZero(time.getMonth() + 1) + '-';
  let D = addZero(time.getDate()) + ' ';
  let h = addZero(time.getHours()) + ':';
  let m = addZero(time.getMinutes()) + ':';
  let s = addZero(time.getSeconds());
  return Y + M + D;
}
/**
 * 转换成hh:mm
 */
function formatDateThree(date) {
  let time = new Date(Date.parse(date));
  time.setTime(time.setHours(time.getHours() + 8));
  // alert(time);
  // if (!isNaN(time)) {
  //     return new Date(Date.parse(date.replace(/-/g, "/")));
  // } else {
  let Y = time.getFullYear() + '-';
  let M = addZero(time.getMonth() + 1) + '-';
  let D = addZero(time.getDate()) + ' ';
  let h = addZero(time.getHours()) + ':';
  let m = addZero(time.getMinutes());
  let s = addZero(time.getSeconds());
  return h + m;
}
// 数字补0操作
function addZero(num) {
  return num < 10 ? '0' + num : num;
}
/**
 * 对日期进行拆解，获得日期字符串
 */
function chaistr(date) {
  var arr = date.split("T");
  var d = arr[0];
  var darr = d.split('-');
  var t = arr[1];
  var tarr = t.split('.000');
  var marr = tarr[0].split(':');
  var dd = parseInt(darr[0]) + "/" + parseInt(darr[1]) + "/" + parseInt(darr[2]) + " " + parseInt(marr[0]) + ":" + parseInt(marr[1]) + ":" + parseInt(marr[2]);
  return dd;
}
module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  formatTimeTwo: formatTimeTwo,
  formatTimeThree: formatTimeThree,
  formatTimeFour: formatTimeFour,
  formatTimeFive: formatTimeFive,
  changeDateFormat: changeDateFormat,
  formatDateNew: formatDateNew,
  renderTime: renderTime,
  formatDateOne: formatDateOne,
  formatDateTwo: formatDateTwo,
  chaistr: chaistr,
  formatDateThree: formatDateThree
}