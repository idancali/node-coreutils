let got = require('got')
let tar = require('tar-fs')
let zlib = require('zlib')

const remote = {
    downloadFromUrl,
    checkIfUrlExists,
    remoteStream
}

function remoteStream(url) {
  return got.stream(url)
}

function downloadFromUrl(url, dest, options) {
    const x = tar.extract(dest, options)

    return new Promise((resolve, reject) => {
        x.on('finish', function () {
            resolve()
        })                

        remoteStream(url).
        pipe(zlib.createGunzip({
            fromBase: false
        })).
        pipe(x)
    })
}

function checkIfUrlExists(url) {
    if (!url) {
        return Promise.reject(new Error())
    }

    return got.head(url)
}

module.exports = remote
