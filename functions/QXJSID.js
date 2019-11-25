const request = require('flyio');
const isUrl = require('is-url');

exports.handler = function (event, context, callback) {
    const { queryStringParameters } = event;
    const url = queryStringParameters['src'];
    const deviceId = queryStringParameters['id'];

    console.log('url: ', url);
    console.log('deviceId: ', deviceId);

    if (!isUrl(url)) {
        console.log('URL is invlid');
        return callback(null, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8"
            },
            statusCode: 400,
            body: "参数 src 无效，请检查是否提供了正确的脚本文件托管地址。"
        });
    }
    if (!deviceId) {
        console.log('deviceId is not found');
        return callback(null, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8"
            },
            statusCode: 400,
            body: "参数 id 无效，请检查是否提供了正确的设备 ID。"
        });
    }

    request.get(url).then(({ data }) => {
        console.log('File fetched success.');
        const result = `/**\n * @supported ${deviceId}\n */\n\n` + data;

        return callback(null, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8"
            },
            statusCode: 200,
            body: result
        });
    }).catch(err => {
        return callback(null, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8"
            },
            statusCode: 400,
            body: err
        });
    })
}
