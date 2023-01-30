export const fetchWrapperApi = {
    get,
    post,
    put,
    delete: _delete
};

function get(serviceUrl, params) {
    var url = new URL(serviceUrl);
    if (JSON.stringify(params) !== '{}') {
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    }

    const requestOptions = {
        method: 'GET'
    };
    
    return fetch(url, requestOptions).then(handleResponse);
}

function post(serviceUrl, params, body) {
    var url = new URL(serviceUrl);
    if (JSON.stringify(params) !== '{}') {
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    }
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };

    return fetch(url, requestOptions).then(handleResponse);
}

function put(serviceUrl, params, body) {
    var url = new URL(serviceUrl);
    if (JSON.stringify(params) !== '{}') {
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    }

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };

    return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(serviceUrl, params) {
    var url = new URL(serviceUrl);
    if (JSON.stringify(params) !== '{}') {
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    }

    const requestOptions = {
        method: 'DELETE'
    };

    return fetch(url, requestOptions).then(handleResponse);
}

// helper functions
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            const error = (data && data.message) || response.statusText || response.error;
            return Promise.reject(error);
        }

        return data;
    });
}