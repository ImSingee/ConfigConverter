const URLSafeBase64 = require('urlsafe-base64');

exports.handler = function(event, context, callback) {
	const { queryStringParameters } = event;
	const encodedStr = queryStringParameters['s'];
	if (!URLSafeBase64.validate(encodedStr)) {
		return callback(null, {
			headers: {
				"Content-Type": "text/plain; charset=utf-8"
			},
			statusCode: 400,
			body: "参数无效"
		})
	}

	const decodedStr = URLSafeBase64.decode(encodedStr).toString();

	let host, port, protocol, method, obfs, base64password, password;
	let base64obfsparam, obfsparam, base64protoparam, protoparam, base64remarks, remarks, base64group, group, udpport, uot;

	const requiredParams = decodedStr.split(':');
	if (requiredParams.length != 6) {
		return callback(null, {
			headers: {
				"Content-Type": "text/plain; charset=utf-8"
			},
			statusCode: 400,
			body: "参数无效"
		})
	}

	host = requiredParams[0];
    port = requiredParams[1];
    protocol = requiredParams[2];
    method = requiredParams[3];
    obfs = requiredParams[4];

    const tempGroup = requiredParams[5].split('/?')
    base64password = tempGroup[0];
    password = URLSafeBase64.decode(base64password).toString();

    if (tempGroup.length > 1) {
    	const optionalParams = tempGroup[1];
    	optionalParams.split('&').forEach(param => {
    		const temp = param.split('=');
    		let key = temp[0], value;
    		if (temp.length > 1) {
    			value = temp[1];
    		}

    		if (value) {
    			switch (key) {
    				case 'obfsparam':
	    				base64obfsparam = value;
	    				obfsparam = URLSafeBase64.decode(base64obfsparam).toString();
	    				break;
    				case 'protoparam':
    					base64protoparam = value;
	    				protoparam = URLSafeBase64.decode(base64protoparam).toString();
    					break;
    				case 'remarks':
    					base64remarks = value;
	    				remarks = URLSafeBase64.decode(base64remarks).toString();
	    				break;
    				case 'group':
    					base64group = value;
	    				group = URLSafeBase64.decode(base64group).toString();
	    				break;
    				case 'udpport':
	    				udpport = value;
	    				break;
    				case 'uot':
	    				uot = value;
	    				break;
    			}
    		}
    	})
    }

    result = {
    	type: 'ss/ssr',
    	host, port, protocol, method, obfs, base64password, password,
    	base64obfsparam, obfsparam, base64protoparam, protoparam, base64remarks, remarks, base64group, group, udpport, uot
    }



	callback(null, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8"
		},
		statusCode: 200,
		body: JSON.stringify(result)
	})
}