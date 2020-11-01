exports.handler = async function(event, context) {
    console.log(event)
    console.log(event.path)
    console.log(event.httpMethod)
    console.log(event.headers)
    console.log(event.queryStringParameters)
    console.log(event.body)
    console.log(event.isBase64Encoded)
}
