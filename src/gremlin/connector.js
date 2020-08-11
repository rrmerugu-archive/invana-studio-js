export async function postData(url = '', extraHeaders = {}, data = {}) {
    // Default options are marked with *
    const url_analysed = new URL(url);
    extraHeaders["Content-Type"] = "application/json";
    extraHeaders["Accept"] = "application/json";
    extraHeaders['Content-Length'] = Buffer.byteLength(JSON.stringify(data));
    if (url_analysed.username && url_analysed.password) {
        extraHeaders['Authorization'] = 'Basic ' + btoa(url_analysed.username + ':' + url_analysed.password);
    } else if (url_analysed.username && url_analysed.password !== "") {
        extraHeaders['Authorization'] = 'Token ' + url_analysed.username;
    }

    const gremlinUrl = url_analysed.origin + url_analysed.pathname;
    const response = await fetch(gremlinUrl, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'include', // include, *same-origin, omit
        headers: extraHeaders,
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json();
}


export function makeQuery(url, query, callback) {
    const payload = {"gremlin": query};
    postData(url, {}, payload).then(data => {
        // check the status and response type and change isConnected
        callback(data);
    });
}
