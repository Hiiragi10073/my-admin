import ajax from 'api/axios.js';

const BaseURL = 'http://localhost:8090'

export const getData = () => ajax(BaseURL + '/user');