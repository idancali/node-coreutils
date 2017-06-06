const base64 = require('base-64')

const data = {
    merge: function (data) {
      var result = {};
      if (data) {
        data.forEach(function(dataObject) {
          if (dataObject) {
            for (var object in dataObject)  { if (dataObject[object]) { result[object] = dataObject[object]; } }
          }
        });
      }

      return result;
    },

    encodeBase64: function(value) {
      return base64.encode(value)
    },

    decodeBase64: function(value) {
      return base64.decode(value)
    }
}

module.exports = data
