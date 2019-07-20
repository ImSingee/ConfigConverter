const request = require('flyio');
const isUrl = require('is-url');
const Surge = require('./ds/Surge');

exports.handler = function (event, context, callback) {
    const { queryStringParameters } = event;
    const url = queryStringParameters['src'];
    const preset = queryStringParameters['preset'];
    const filter = queryStringParameters['filter'];
    const filterURL = queryStringParameters['filter_url'];

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

    request.get(url).then(({ data }) => {
        console.log('Profile fetched success.');
        const surge = new Surge(data);
        console.log('Build Surge object success.');
        let result;

        if (preset) {
            result = surge.preset(preset);
        } else {
            result = surge.list();
            if (filter) {
                result = result.filter(filter);
            }
            if (filterURL) {
                result = result.filterURL(filterURL);
            }
            result = result.generate();
        }

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
