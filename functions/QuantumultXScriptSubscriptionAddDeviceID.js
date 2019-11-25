const request = require('flyio');
const isUrl = require('is-url');

const URLSafeBase64 = require('urlsafe-base64');
const QueryString = require('query-string');

const { URL: HOST } = process.env;

exports.handler = function (event, context, callback) {
    const { queryStringParameters } = event;
    const paramsB64 = queryStringParameters['b64'];
    let url, deviceId;

    if (paramsB64) {
        const params = QueryString.parse(URLSafeBase64.decode(paramsB64).toString());
        url = params.src;
        deviceId = params.id;
    } else {
        url = queryStringParameters['src'];
        const deviceIdRaw = queryStringParameters['id'];
        if (deviceIdRaw) {
            deviceId = deviceIdRaw.replace(/\./g, '');
        } else {
            const deviceIdB64 = queryStringParameters['idb64'];
            deviceId = URLSafeBase64.decode(deviceIdB64).toString();
        }
        
    }
    
    console.log('url: ', url);
    console.log('deviceId: ', deviceId);


    if (!isUrl(url)) {
        console.log('URL is invlid');
        return callback(null, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8"
            },
            statusCode: 400,
            body: "参数 src 无效，请检查是否提供了正确的脚本订阅文件托管地址。"
        });
    }
    if (!deviceId) {
        console.log('deviceId is not found');
        return callback(null, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8"
            },
            statusCode: 400,
            body: "参数 id （或其他替换结果）无效，请检查是否提供了正确的设备 ID。"
        });
    }

    request.get(url).then(({ data }) => {
        console.log('File fetched success.');
        const allLines = data.split('\n');
        const resultLines = new Array();
        
        for (const singleLine of allLines) {
            const singleLineTrimed = singleLine.trim();
            if (singleLineTrimed == '') {
                ;// Do nothing
            } else if (singleLineTrimed.startsWith('hostname')) {
                resultLines.push(singleLineTrimed);
            } else if (singleLineTrimed.startsWith('#')) {
                ;// Do nothing
            } else if (singleLineTrimed.startsWith(';')) {
                ;// Do nothing
            } else {
                const currentLineElements = singleLineTrimed.split(/\s+/);
                if (currentLineElements.length < 4) {
                    resultLines.push(singleLineTrimed);
                } else if (currentLineElements[2] != 'script-response-body') {
                    resultLines.push(singleLineTrimed);
                } else {
                    currentLineElements[3] = `${HOST}/api/QuantumultXScriptAddDeviceID?id=${encodeURI(deviceId)}&src=${encodeURI(currentLineElements[3])}`;
                    resultLines.push(currentLineElements.join(' '));
                }
            }
            
        }

        return callback(null, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8"
            },
            statusCode: 200,
            body: `;deviceId = ${deviceId}\n` + resultLines.join('\n')
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
