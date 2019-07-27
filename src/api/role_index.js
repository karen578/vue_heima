import axios from '@/utils/myaxios.js'

// 获取全部角色
export const getAllRoleList = () => {
  return axios({
    url: 'roles'
  })
}
// 添加角色
export const addRole = (data) => {
  return axios({
    url: 'roles',
    method: 'post',
    data: {
      roleName: data.roleName,
      roleDesc: data.roleDesc
    }
  })
}
