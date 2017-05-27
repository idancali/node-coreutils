var moment  = require('moment');

const date = {

  stamp: function () {
    var now = new Date();
    year = "" + now.getFullYear();
    month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
    day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
    hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
    minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
    second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
    return year + month + day + hour + minute + second;
  },

  nice: function(string, locale) {
    moment.locale(locale);
    return moment(string).format('MMMM Do, YYYY');
  }
}

module.exports = date