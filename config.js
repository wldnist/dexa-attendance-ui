const apiUrl = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000/api' // development api
    : 'http://localhost:3000/api'; // production api
const apiUrlProfileSvc = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3002/' // development api
    : 'http://localhost:3002/'; // production api

export {
    apiUrl,
    apiUrlProfileSvc
};