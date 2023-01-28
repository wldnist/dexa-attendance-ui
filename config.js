const apiUrl = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000/api' // development api
    : 'http://localhost:3000/api'; // production api
const apiUrlProfileSvc = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3002/profiles' // development api
    : 'http://localhost:3002/profiles'; // production api
const apiUrlAttendanceSvc = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3004/attendances' // development api
    : 'http://localhost:3004/attendances'; // production api

export {
    apiUrl,
    apiUrlProfileSvc,
    apiUrlAttendanceSvc
};