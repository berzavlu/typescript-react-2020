/* eslint-disable object-curly-newline */
import fetch from 'isomorphic-unfetch'
import Cookies from 'js-cookie'
import ENV from 'env'

const { API_URL } = ENV[process.env.NODE_ENV]

class API {
  static request(url, method, body) {
    const data = {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : {},
    }

    if (Cookies.get('token')) {
      data.headers.Authorization = `Bearer ${Cookies.get('token')}`
    }

    if (method === 'POST' || method === 'PUT') {
      data.body = JSON.stringify(body)
    }

    return new Promise((resolve, reject) => {
      fetch(API_URL + url, data)
        .then((response) => {
          if (response.status >= 400) {
            throw new Error('Bad response from server')
          }
          return response.json()
        })
        .then((response) => {
          if (Object.prototype.hasOwnProperty.call(response, 'error')) {
            reject(response)
          } else {
            resolve(response)
          }
        })
        .catch(() => {
          const obj = {
            msg: 'Ocurrió un error en el servidor.',
          }
          reject(obj)
        })
    })
  }
}

export default API
