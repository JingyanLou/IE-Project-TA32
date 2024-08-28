// src/utils/api.js
export const getApiBaseUrl = () => {
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('REACT_APP_API_URL_LOCAL:', process.env.REACT_APP_API_URL_LOCAL);
    console.log('REACT_APP_API_URL_PROD:', process.env.REACT_APP_API_URL_PROD);

    return process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_API_URL_LOCAL
        : process.env.REACT_APP_API_URL_PROD;
};
