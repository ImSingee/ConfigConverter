const request = require('request-promise');
const isUrl = require('is-url');

exports.handler = function (event, context, callback) {
    const { queryStringParameters } = event;
    const url = queryStringParameters['src'];

    console.log('url: ', url);

    if (!isUrl(url)) {
        console.log('URL is invlid');
        return callback(null, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8"
            },
            statusCode: 400,
            body: "参数 src 无效，请检查是否提供了正确的网址。"
        });
    }

    request.get(url).then(data => {
        console.log('File fetched success.');

        return callback(null, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8"
            },
            statusCode: 200,
            body: data
        });
    }).catch(err => {
        console.error('Error', err);
        return callback(null, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8"
            },
            statusCode: 400,
            body: '请求错误，请查看日志'
        });
    })
}
