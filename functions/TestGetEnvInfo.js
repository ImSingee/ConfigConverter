const { checkPassword } = require('./protect/password');

exports.handler = function (event, context, callback) {
      if (!checkPassword(event, true)) {
            return callback(null, {
                headers: {
                    "Content-Type": "text/plain; charset=utf-8"
                },
                statusCode: 401,
                body: "未提供密码或提供的密码不正确。"
            });
      }

      const env = process.env;
      
      return callback(null, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8"
            },
            statusCode: 200,
            body: JSON.stringify({ event, context, env })
      });
}
