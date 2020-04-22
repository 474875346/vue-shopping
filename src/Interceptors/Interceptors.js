import axios from 'axios'
import Vue from 'vue'
import {
  showLoading,
  hideLoading
} from './loading'

Vue.prototype.$http = axios

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

axios.interceptors.request.use(function (config) {
  showLoading()
  console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  hideLoading()
  return response
}, function (error) {
  hideLoading()
  return Promise.reject(error)
})
