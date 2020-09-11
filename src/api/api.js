import ajax from 'api/axios.js';

const BaseURL = 'http://localhost:8090'

// 测试
export const getData = () => ajax(BaseURL + '/user');

export const login = (data) => ajax(BaseURL + '/login', data, 'POST');