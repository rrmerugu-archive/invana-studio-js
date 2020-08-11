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


export class WebConnectorBase {
    /*

    gremlinUrl can be

    wss://localhost:8182/gremlin - connect over ws/wss
    https://localhost:8182/gremlin - connect over http/https
    https://user:password@awesome-proxy-domain.local/gremlin - with basic authentication
    https://access-or-session-token@awesome-proxy-domain.local/gremlin - with token based authentication
     */


    constructor(props) {
        console.log("props", props);
        this.props = props;
    }

    static defaultProps = {
        gremlinUrl: null,
        extraHeaders: {},
        callback: (response) => console.error("callback not set in HTTPConnector")
    }


}


export class HTTPConnector extends WebConnectorBase {
    /*
        const connector = new HTTPConnector({
            gremlinUrl : "https://localhost:8182/gremlin",
            extraHeaders: {'x-mytoken': 'abcdef123'}, // optional
            callback: (response, extraCallback) => console.log("process the response", response)
        })


        extraCallback is to do any operations after the callback is processed.
     */


    makeQuery(query, extraCallback) {
        console.log("this.props", this.props);
        const payload = {"gremlin": query};
        postData(this.props.gremlinUrl, this.props.extraHeaders, payload).then(response => {
            // check the status and response type and change isConnected
            this.props.callback(response, extraCallback);
        });
    }
}

export class WSConnector extends WebConnectorBase {

}


export class CSVConnector extends WebConnectorBase {
    // TODO - not implemented
}

export class TSVConnector extends WebConnectorBase {
    // TODO - not implemented
}
