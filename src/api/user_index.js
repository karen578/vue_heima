import axios from '@/utils/myaxios.js'

export const login = (data) => {
  return axios({
    url: 'login',
    method: 'post',
    data
  })
}
// 发送axios请求，请求方式为get的时候，发送的数据为对象时只能用params键
export const getAllUserList = (params) => {
  return axios({
    url: 'users',
    method: 'get',
    params
  })
}
