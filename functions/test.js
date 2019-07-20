exports.handler = function (event, context, callback) {
    const { queryStringParameters } = event;

    const src = queryStringParameters['src'];
    
    return callback(null, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8"
        },
        statusCode: 200,
        body: `成功。src=${src}`
    });
}
