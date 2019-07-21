import axios from 'axios'
// 设置基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
// 需要在axios里面设置
// 设置拦截器
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // config是请求报文，里面有请求头
// 先获取token值
  var token = localStorage.getItem('itcast_massages_token')

  config.headers['Authorization'] = token
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
export default axios
