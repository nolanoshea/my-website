const https = require('https')
const url = 'https://registry.jsonresume.org/nolanoshea'

const darkModeAPISnippet = '<script async src="https://cdn.jsdelivr.net/npm/darkreader/darkreader.min.js" onload="DarkReader.auto()"></script>'

const linkDetailEl = '<div class="detail"><span class="icon"><i class="icon fs-lg icon-link"></i></span><span class="info"><a href="https://nolanoshea.com" target="_blank">https://nolanoshea.com</a></span></div>'

exports.handler = async (event) => {
    let dataString = ''
    
    const response = await new Promise((resolve, reject) => {
        const req = https.get(url, res => {
          res.on('data', chunk => dataString += chunk)
            .on('end', () => {
                resolve({
                    statusCode: 200,
                    // apply custom transformations to the response
                    body: dataString.replace(/(.*)(<\/body>.*)/, '$1' + darkModeAPISnippet + '$2') // inject dark mode snippet
                        .replace(new RegExp('(.*)' + linkDetailEl + '(.*)'), '$1$2') // remove redundant link detail
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
