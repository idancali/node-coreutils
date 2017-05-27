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
  }
}

module.exports = data