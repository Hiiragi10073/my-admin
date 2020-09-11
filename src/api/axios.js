import axios from 'axios';

export default function ajax(url, config = {}, method = "GET") {
  return new Promise((resolve, reject) => {
    let promise;

    if (method === 'GET') {
      if (config instanceof Object) {
        promise = axios.get(url, { params: config });
      } else {
        promise = axios.get(url + config);
      }
    } else {
      promise = axios.post(url, config);
    }

    promise.then(response => {
      resolve(response.data);
    }).catch(error => {
      reject(error);
    })
  });
}