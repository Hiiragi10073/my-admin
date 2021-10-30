import ajax from 'config/axios.js'
const BaseURL = process.env.VUE_APP_BASEURL
console.log(BaseURL)

// 登录
export const login = (data) => ajax(BaseURL + '/login', data, 'post')

// 获取用户信息
export const getUserData = () => ajax(BaseURL + '/user-info')

// 获取菜单数据
export const getMenuData = () => ajax(BaseURL + '/menu')

// 上传文件
export const updateFile = (data) =>
  ajax(BaseURL + '/api/updateFile', data, 'post')

// 修改用户数据
export const updateUser = (data) =>
  ajax(BaseURL + '/api/updateUser', data, 'post')
