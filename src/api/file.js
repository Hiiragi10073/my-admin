import ajax from 'config/axios.js'
const BaseURL = process.env.VUE_APP_BASEURL

// 上传文章封面
export const uploadFile = (data) =>
  ajax(BaseURL + '/file/upload', data, 'post')