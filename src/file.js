const path = require('path')
const fs = require('fs-extra')

const file = {
    jsonMerge: function (file, data) {
        var fileContent = {}

        if (fs.existsSync(file)) {
            fileContent = JSON.parse(fs.readFileSync(file, 'utf8'))
        }

        // Dump the friendly JSON to the file
        fs.writeFileSync(file, JSON.stringify(Object.assign({}, fileContent, data), null, 2), "utf8")    
    }
}

module.exports = file