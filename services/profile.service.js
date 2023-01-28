import { apiUrlProfileSvc } from 'config';
import { fetchWrapperApi } from 'helpers';

export const profileService = {
    list,
    get,
    create,
    update,
    delete: _delete
};

const baseUrl = `${apiUrlProfileSvc}`;

function list(params) {
    return fetchWrapperApi.get(baseUrl, params);
}

function get(id, params) {
    return fetchWrapperApi.get(`${baseUrl}/${id}`, params);
}

function create(params, body) {
    return fetchWrapperApi.post(baseUrl, params, body);
}

function update(id, params, body) {
    return fetchWrapperApi.put(`${baseUrl}/${id}`, params, body);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id, params) {
    return fetchWrapperApi.delete(`${baseUrl}/${id}`, params);
}
