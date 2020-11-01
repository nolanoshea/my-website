exports.handler = async function(event, context) {
    const https = require('https')
    const options = {
      hostname: 'registry.jsonresume.org',
      port: 443,
      path: '/nolanoshea',
      method: 'GET'
    }
    
    let output = ''

    const req = https.request(options, res => {
        res.on('data', chunk => output += chunk)
            .on('end', () => {
                let obj = JSON.parse(output)

                console.log(obj)
//                 onResult(res.statusCode, obj)
            })
    })

    req.on('error', error => console.error(error.message))
    req.end()
}
