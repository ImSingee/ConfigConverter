exports.handler = function (event, context, callback) {
    const { queryStringParameters } = event;

    let result = '';
    for (const key of queryStringParameters) {
        result += `${key} = ${queryStringParameters[key]}\n`;
    }

    return callback(null, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8"
        },
        statusCode: 200,
        body: `成功。\n${result}`
    });
}
