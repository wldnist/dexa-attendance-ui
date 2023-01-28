import { apiUrlAttendanceSvc } from 'config';
import { fetchWrapperApi } from 'helpers';

export const attendanceService = {
    list,
    get,
    getCurrentAttendance,
    upsert
};

const baseUrl = `${apiUrlAttendanceSvc}`;

function list(params) {
    return fetchWrapperApi.get(baseUrl, params);
}

function get(id, params) {
    return fetchWrapperApi.get(`${baseUrl}/${id}`, params);
}

function getCurrentAttendance(params) {
    return fetchWrapperApi.get(`${baseUrl}/current/attendance`, params);
}

function upsert(params, body) {
    return fetchWrapperApi.post(baseUrl, params, body);
}
