import { apiUrlProfileSvc } from 'config';
import { fetchWrapperApi } from 'helpers';

export const profileService = {
    list,
    get,
    create,
    update,
    delete: _delete
};

const baseUrl = `${apiUrlProfileSvc}/profiles`;

function list() {
    return fetchWrapperApi.get(baseUrl);
}

function get(id) {
    return fetchWrapperApi.get(`${baseUrl}/${id}`);
}

function create(params) {
    return fetchWrapperApi.post(baseUrl, params);
}

function update(id, params) {
    return fetchWrapperApi.put(`${baseUrl}/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapperApi.delete(`${baseUrl}/${id}`);
}
