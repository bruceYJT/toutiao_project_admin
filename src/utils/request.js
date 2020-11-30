/*
    基于 axios 封装的请求模板
*/
import axios from 'axios'

// axios()
// axios.get()
// axios.post()

// 创建一个axios 实例
const request = axios.create({
//   baseURL: 'http://ttapi.research.itcast.cn/'
  baseURL: 'http://127.0.0.1:5000/'
})

// 请求拦截器

// 响应拦截器

// 导出请求方法
export default request

// 谁要使用谁就加载 request 模块
// import request from 'request.js'
// request.xxx
// request({
//   method: ,
//   url: ''
// })
