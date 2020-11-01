const https = require('https')
const url = 'https://registry.jsonresume.org/nolanoshea'

exports.handler = async (event) => {
    let dataString = ''
    
    const response = await new Promise((resolve, reject) => {
        const req = https.get(url, res => {
          res.on('data', chunk => {
            dataString += chunk
          });
          res.on('end', () => {
//               let obj = JSON.parse(dataString)
              console.log(dataString)
//             resolve({
//                 statusCode: 200,
//                 body: JSON.stringify(JSON.parse(dataString), null, 4)
//             })
          })
        })
        
        req.on('error', (e) => {
          reject({
              statusCode: 500,
              body: 'Something went wrong!'
          })
        })
    })
    
    return response
}
