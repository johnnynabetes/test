const http = {
    httpHeaders: {

    },
    _baseRequest(resolve, reject) {
        let request = new XMLHttpRequest();
        request.onload = function () {
            if (request.status === 200)
                return resolve(request.responseText);
            reject(request.response);
        };
        request.onerror = function () {
            reject(request.response);
        };
        return request;
    },
    _addHeaders(request) {
        request.setRequestHeader('Content-Type', 'application/json');
        for (var header in http.httpHeaders) {
            request.setRequestHeader(header, http.httpHeaders[header]);
        }
    },
    get(url) {
        return new Promise(function (resolve, reject) {
            let request = http._baseRequest(resolve, reject);
            request.open("GET", url, true);
            http._addHeaders(request);
            request.send(null);
        });
    },
    post(url, parameters) {
        return new Promise(function (resolve, reject) {
            let request = http._baseRequest(resolve, reject);
            request.open("POST", url, true);
            http._addHeaders(request);
            request.send(JSON.stringify(parameters));
        });
    },
    all(promises) {
        return Promise.all(promises);
    }
}

export default http;