import ajax from 'api/axios.js';

const BaseURL = 'http://localhost:8090'

// 测试
export const getData = () => ajax(BaseURL + '/user');

// 登录
export const login = (data) => ajax(BaseURL + '/login', data, 'POST');

// 获取用户信息
export const getUserData = () => ajax(BaseURL + '/user-info');

// 获取菜单数据
export const getMenuData = () => ajax(BaseURL + '/menu');

// 上传文件
export const updateFile = (data) => ajax(BaseURL + '/updateFile', data, 'POST');

// 修改用户数据
export const updateUser = (data) => ajax(BaseURL + '/updateUser', data, 'POST');