const https = require('https')
const url = 'https://registry.jsonresume.org/nolanoshea'

const darkModeAPI = '<script async src="https://cdn.jsdelivr.net/npm/darkreader@4.9.40/darkreader.min.js" onload="' +
      'DarkReader.setFetchMethod(window.fetch);' +
      'DarkReader.auto();' +
      '"></script>'

const removeLinkDetail = '<script>' +
      'document.getElementsByClassName("icon-link")[0].parentNode.parentNode.remove()' +
      '</script>'

// add back once renewed
const fixBadge = '<script>' +
      'let badgeNode = document.querySelector(\'[itemprop="certificate"]\').childNodes[0];' +
      'badgeNode.innerHTML = badgeNode.innerHTML.replace(/&lt;/, "<").replace(/&gt;/, ">")' +
      // remove comma
      '.replace(/,/, "")' +
      '</script>'

const snippets = darkModeAPI + removeLinkDetail

exports.handler = async (event) => {
    let dataString = ''
    
    const response = await new Promise((resolve, reject) => {
        const req = https.get(url, res => {
          res.on('data', chunk => dataString += chunk)
            .on('end', () => {
                resolve({
                    statusCode: 200,
                    body: dataString.replace(/(.*)(<\/body>.*)/, '$1' + snippets + '$2') // inject snippets
                })
            })
        })
        
        req.on('error', (e) => {
          reject({
              statusCode: 500,
              body: e.message
          })
        })
    })
    return response
}
