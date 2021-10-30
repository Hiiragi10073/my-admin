import ajax from 'config/axios.js'
const BaseURL = process.env.VUE_APP_BASEURL + '/blog'

// 获取文章分类
export const getCategory = () => ajax(BaseURL + '/category')

// 新增文章分类
export const addCategory = (data) =>
  ajax(BaseURL + '/category', data, 'post')

// 编辑文章分类
export const updateCategory = (data) =>
  ajax(BaseURL + '/category', data, 'put')

// 删除文章分类
export const deleteCategory = (id) =>
  ajax(BaseURL + '/category/' + id, null, 'delete')

// 获取文章信息
export const getBlogList = (config) => ajax(BaseURL + '/list', config)

// 删除文章
export const deleteBlog = (id) => ajax(BaseURL + '/' + id, null, 'delete')

// 更新文章内容
export const updateBlog = (data) => ajax(BaseURL, data, 'put')

// 发布文章
export const releaseBlog = (data) => ajax(BaseURL, data, 'post')
