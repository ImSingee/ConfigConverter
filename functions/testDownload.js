const child_process = require("child_process");
const request = require('flyio');
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
            body: "参数 src 无效，请检查是否提供了正确的 Surge Profile 托管地址。"
        });
    }

    child_process.exec('curl --version', (err, stdout, stderr) => {
        console.log('curl --version INFO',{
            err, stdout, stderr
        });
    })

    // request.get(url).then(({ data }) => {
    //     console.log('File fetched success.');

    //     return callback(null, {
    //         headers: {
    //             "Content-Type": "text/plain; charset=utf-8"
    //         },
    //         statusCode: 200,
    //         body: 'Download Success' 
    //     });
    // }).catch(err => {
    //     console.log('Error', err);
    //     return callback(null, {
    //         headers: {
    //             "Content-Type": "text/plain; charset=utf-8"
    //         },
    //         statusCode: 400,
    //         body: err
    //     });
    // })
}
