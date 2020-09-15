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

// 获取文章分类
export const getCategory = () => ajax(BaseURL + '/getCategory');

// 新增文章分类
export const updateCategory = (data) => ajax(BaseURL + '/updateCategory', data, 'POST');

// 删除文章分类
export const deleteCategory = (id) => ajax(BaseURL + '/deleteCategory', id);

// 获取文章信息
export const getPostList = (config) => ajax(BaseURL + '/getPostList', config, 'POST');

// 删除文章
export const deletePost = (id) => ajax(BaseURL + '/deletePost', id);

// 上传文章封面
export const uploadPostCover = (data) => ajax(BaseURL + '/uploadPostCover', data, 'POST');

// 更新文章内容
export const updatePost = (data) => ajax(BaseURL + '/updatePost', data, 'POST');
