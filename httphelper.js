const fetch = require('node-fetch');

 const get = async (url) => {
    const resp = await fetch(url);
    const body = await resp.json();
    return body;
}

module.exports = {
    get: get
}