const { FORCE_PASSWORD: FORCE_PASSWORD_str, PASSWORD } = process.env;
const FORCE_PASSWORD = FORCE_PASSWORD_str === 'True' ? true : false;

function checkPassword(event) {
    const { queryStringParameters } = event;
    const { pwd: password } = queryStringParameters;

    if (!FORCE_PASSWORD) return true;

    return password === PASSWORD;
}

module.exports = { checkPassword };