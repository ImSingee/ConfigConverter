const fly = require("flyio");
const atob = require('atob');
const isUrl = require('is-url');

exports.handler = function(event, context, callback) {
	const { queryStringParameters } = event;

	const url = queryStringParameters['src'];

	if (!isUrl(url)) {
		return callback(null, {
			headers: {
				"Content-Type": "text/plain; charset=utf-8"
			},
		    statusCode: 400,
		    body: "参数 src 无效，请检查是否提供了正确的节点订阅地址。"
		});
	}

	fly.get(url).then(response => {
		const bodyDecoded = atob(response.data);
		const links = bodyDecoded.split('\n');
		const filteredLinks = links.filter(link => {
			// Only support ss & ssr now
			if (link.startsWith('ss://')) return true;
			if (link.startsWith('ssr://')) return true;
			return false;
		});

		if (filteredLinks.length == 0) {
			return callback(null, {
				headers: {
					"Content-Type": "text/plain; charset=utf-8"
				},
				statusCode: 400,
				body: "订阅地址中没有节点信息。"
			});
		}
		const processedLinks = new Array();
		filteredLinks.forEach(link => {
			// 将订阅链接包装为对象
			if (link.startsWith('ss://')) {

			}

			// 过滤非 origin、plain 的 SSR 节点（Clash 暂时只支持 SS）

			// DEBUG
			processedLinks.push(link);
		})

		if (processedLinks.length == 0) {
			return callback(null, {
				statusCode: 400,
				body: "订阅地址中没有节点信息。"
			});
		}



		// DEBUG
		return callback(null, {
			headers: {
				"Content-Type": "text/plain; charset=utf-8"
			},	
			statusCode: 200,
			body: JSON.stringify(processedLinks)
		});
	}).catch(error => {
		// 404
		if (error && !isNaN(error.status)) {
			return callback(null, {
				headers: {
					"Content-Type": "text/plain; charset=utf-8"
				},
				statusCode: 400,
		    	body: "订阅地址网站出现了一个 " + String(error.status) + " 错误。"
			});
		}

		// Unknown
		return callback(null, {
			headers: {
				"Content-Type": "text/plain; charset=utf-8"
			},
			statusCode: 500,
	    	body: "Unexpected Error.\n" + JSON.stringify(error)
		});
	})
    
}
