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
export const addUser = (data) => {
  return axios({
    url: '/users',
    method: 'post',
    data
  })
}
// 编辑用户
export const editUser = (data) => {
  return axios({
    url: `users/${data.id}`,
    method: 'put',
    data: {
      email: data.email,
      mobile: data.mobile
    }
  })
}
// 删除用户
export const delUser = (id) => {
  return axios({
    url: `users/${id}`,
    method: 'delete'
  })
}
// 修改用户状态
export const UpdateUserState = (uid, type) => {
  return axios({
    url: `users/${uid}/state/${type}`,
    method: 'put'
  })
}
// 分配角色
export const updateRole = (data) => {
  return axios({
    url: `users/${data.id}/role`,
    method: 'put',
    data: {
      rid: data.rid
    }
  })
}
