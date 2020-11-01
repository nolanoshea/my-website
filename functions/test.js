const https = require('https')
const url = 'https://registry.jsonresume.org/nolanoshea'

exports.handler = async (event) => {
    let dataString = ''
    
    const response = await new Promise((resolve, reject) => {
        const req = https.get(url, res => {
          res.on('data', chunk => dataString += chunk)
            .on('end', () => {
                resolve({
                    statusCode: 200,
                    body: dataString
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
