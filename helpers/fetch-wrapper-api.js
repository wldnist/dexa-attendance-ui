export const fetchWrapperApi = {
    get,
    post,
    put,
    delete: _delete
};

function get(url, params) {
    const requestOptions = {
        method: 'GET',
        params: JSON.stringify(params)
    };
    const a = fetch(url, requestOptions).then(handleResponse);
    console.log(a);
    return a;
}

function post(url, params, body) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        params: JSON.stringify(params),
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function put(url, params, body) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        params: JSON.stringify(params),
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url, params) {
    const requestOptions = {
        method: 'DELETE',
        params: JSON.stringify(params)
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