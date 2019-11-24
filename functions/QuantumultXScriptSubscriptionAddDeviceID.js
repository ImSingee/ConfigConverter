const request = require('flyio');
const isUrl = require('is-url');

const { URL: HOST } = process.env;

exports.handler = function (event, context, callback) {
    const { queryStringParameters } = event;
    const url = queryStringParameters['src'];
    let deviceIdRaw = queryStringParameters['id'];
    const deviceIdB64 = queryStringParameters['idb64'];
    
    console.log('url: ', url);
    console.log('deviceIdRaw: ', deviceIdRaw);
    console.log('deviceIdB64: ', deviceIdB64);

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
    if (!deviceIdRaw) {
        console.log('deviceId is not found');
        if (!deviceIdB64) {
            return callback(null, {
                headers: {
                    "Content-Type": "text/plain; charset=utf-8"
                },
                statusCode: 400,
                body: "参数 id 无效，请检查是否提供了正确的设备 ID。"
            });
        } else {
            const URLSafeBase64 = require('urlsafe-base64');
            deviceIdRaw = URLSafeBase64.decode(deviceIdB64).toString();
        }
    }
    
    const deviceId = deviceIdRaw.replace(/\./g, '');
    console.log('deviceId: ', deviceId);

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
                    currentLineElements[3] = `${HOST}/api/QuantumultXScriptAddDeviceID?id=${deviceId}&src=${currentLineElements[3]}`;
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
