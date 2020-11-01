exports.handler = async function(event, context) {
    fetch('https://registry.jsonresume.org/nolanoshea')
        .then(res => console.log(res))
}
