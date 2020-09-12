import ajax from 'api/axios.js';

const BaseURL = 'http://localhost:8090'

// 测试
export const getData = () => ajax(BaseURL + '/user');

// 登录
export const login = (data) => ajax(BaseURL + '/login', data, 'POST');

// 获取用户信息
export const getUserData = () => ajax(BaseURL + '/user-info');