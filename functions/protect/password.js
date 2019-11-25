const { FORCE_PASSWORD: FORCE_PASSWORD_str, PASSWORD } = process.env;
const FORCE_PASSWORD = FORCE_PASSWORD_str === 'True' ? true : false;

function checkPassword(event, force = false) {
    const { queryStringParameters } = event;
    const { pwd: password } = queryStringParameters;

    if (!force && !FORCE_PASSWORD) return true;

    return password === PASSWORD;
}

module.exports = { checkPassword };