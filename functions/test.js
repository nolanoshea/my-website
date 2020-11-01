exports.handler = async function(event, context) {
    console.log('inside test serverless function')
    const https = require('https')
    const options = {
      hostname: 'registry.jsonresume.org',
      port: 443,
      path: '/nolanoshea',
      method: 'GET'
    }
    
    let output = ''

    console.log('about to make request')
    const req = https.request(options, res => {
        res.on('data', chunk => {
            console.log('inside on data')
            output += chunk
        }).on('end', () => {
                console.log('inside on end')
                let obj = JSON.parse(output)

                console.log(obj)
//                 onResult(res.statusCode, obj)
            })
    })
    console.log('outside of request')
    req.on('error', error => {
        console.log('inside of error lambda')
        console.error(error.message)
        console.log('end of error lambda')
    })
    req.end()
    console.log('end of test serverless function')
}
