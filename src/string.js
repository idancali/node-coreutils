const string = {
    
  repeat: function(original, count) {
    return new Array(count+1).join(original);
  },

  contentType: function (filename) {
    var lowercase = filename.toLowerCase();

    if (lowercase.indexOf('.html') >= 0) return 'text/html';
    else if (lowercase.indexOf('.css') >= 0) return 'text/css';
    else if (lowercase.indexOf('.json') >= 0) return'application/json';
    else if (lowercase.indexOf('.js') >= 0) return 'application/x-javascript';
    else if (lowercase.indexOf('.png') >= 0) return 'image/png';
    else if (lowercase.indexOf('.jpg') >= 0) return 'image/jpg';

    return 'application/octet-stream';
  },

  uuid: function () {
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-0xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (d + Math.random()*16)%16 | 0;
          d = Math.floor(d/16);
          return (c=='x' ? r : (r&0x3|0x8)).toString(16);
      });
      return uuid;
  }
}

String.prototype.repeat = function(count) {
    return string.repeat(this, count)
}

module.exports = string