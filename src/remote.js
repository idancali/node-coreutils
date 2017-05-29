let got = require('got')
let tar = require('tar')
let zlib = require('zlib')

const remote = {
    downloadFromUrl,
    checkIfUrlExists,
    remoteStream
}

function remoteStream(url) {
  return got.stream(url)
}

function downloadFromUrl(url, dest) {
    // return //new Promise((resolve, reject) => {
        remoteStream(url).
        pipe(zlib.createGunzip({
            fromBase: false
        })).
        pipe(tar.x({
            strip: 1,
            C: dest,
            sync: true
        }))
        // on('finish', function () {
        //     resolve()
        // })                
    // })
}

function checkIfUrlExists(url) {
    if (!url) {
        return Promise.reject(new Error())
    }

    return got.head(url)
}

module.exports = remote
