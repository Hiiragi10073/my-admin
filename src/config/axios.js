import axios from 'axios'
import { MessageBox } from 'element-ui'

// Add a request interceptor
axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    if (localStorage.getItem('token')) {
      config.headers.Authorization = localStorage.getItem('token')
    }
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function(error) {
    // token 验证失败的情况
    const { code, message } = error.response.data
    if (code === -1) {
      MessageBox.alert(message, '登录失效', {
        confirmButtonText: '返回登录页面',
        callback: (action) => {
          localStorage.removeItem('token')
          window.location.href = '/'
        }
      })
    }
    return Promise.reject(error)
  }
)

export default function ajax(url, config = {}, method = 'get') {
  return new Promise((resolve, reject) => {
    let promise

    if (method === 'get') {
      if (config instanceof Object) {
        promise = axios.get(url, { params: config })
      } else {
        promise = axios.get(url + '/' + config)
      }
    } else {
      promise = axios[method](url, config)
    }

    promise
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
