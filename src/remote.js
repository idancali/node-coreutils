let got = require('got')
let tar = require('tar')
let zlib = require('zlib')

const remote = {
    downloadFromUrl,
    checkIfUrlExists,
    remoteStream,
    timeout,
    prepareRequest,
    parseResponse,
    sendRequest
}

function prepareRequest (request) {
  // Prepare the request properties
  const url = `${request.url}`.toLowerCase()
  const options = {
    method: request.method.toUpperCase(),
    headers: request.headers
  }

  if (request.body) {
    // Inject the body if found
    options.body = JSON.stringify(request.body)
  }

  return {url, options}
}

function parseResponse(response) {
    return new Promise((resolve, reject) => {
      if (!response || response === undefined) {
        // If the response does not contain a json payload, we won't fail this
        // response but we'll send it back with a warning
        resolve({ status: 0, warning: 'Empty response', data: {} })
        return
      }

      // We do have some json, so let's try to parse it
      response.json().

           // Looks like the json is valid, the request is good to go now
           then(json => resolve({status: response.status, data: json })).

           // Sounds like an invalid json; we don't fail the response but we
           // will need to flag it as a warning
           catch(err => resolve({ status: response.status, warning: 'Invalid response', data: {} }))
     })
}

function sendRequest (request) {
  let requestParams = prepareRequest(request)
  return new Promise((resolve, reject) => {
    Utils.timeout(request.timeout, fetch(requestParams.url, requestParams.options)).
          then((response) => parseResponse(response)).
          then((response) => resolve(response)).
          catch((error) => {
            reject(error)
          })
  })
}

function timeout(ms, promise) {
  return new Promise(function(resolve, reject) {
      setTimeout(function() {
          reject(new Error('Operation timed out'))
      }, ms)
      promise.then(resolve, reject)
  })
}

function remoteStream(url) {
  return got.stream(url)
}

function downloadFromUrl(url, dest, options) {
    return new Promise((resolve, reject) => {
        remoteStream(url).
                pipe(zlib.createGunzip({
                    fromBase: false
                })).
                pipe(tar.x({
                    strip: 1,
                    C: dest
                })).
                on('end', () => resolve()).
                on('error', () => reject(new Error('could not download')))
    })
}

function checkIfUrlExists(url) {
    if (!url) {
        return Promise.reject(new Error())
    }

    return got.head(url)
}

module.exports = remote
