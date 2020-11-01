const https = require('https')
const url = 'https://registry.jsonresume.org/nolanoshea'
const injectedSnippet = '<script async src="https://cdn.jsdelivr.net/npm/darkreader/darkreader.min.js" onload="DarkReader.auto()"/>'

exports.handler = async (event) => {
    let dataString = ''
    
    const response = await new Promise((resolve, reject) => {
        const req = https.get(url, res => {
          res.on('data', chunk => dataString += chunk)
            .on('end', () => {
                resolve({
                    statusCode: 200,
                    body: dataString.replace(/(.*)(<\/body>.*)/, '$1' + injectedSnippet + '$2')
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
