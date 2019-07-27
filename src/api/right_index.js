import axios from '@/utils/myaxios.js'

export const getAllRight = (type) => {
  return axios({
    // 值: list 或 tree , list 列表显示权限, tree 树状显示权限,`参数是url参数:type ,根据文档知道url参数为type，所以需要拼接参数
    url: `rights/${type}`
  })
}
export const delRight = (roleId, rightId) => {
  return axios({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}
// 角色授权
export const grantRightById = (roleId, rids) => {
  return axios({
    url: `roles/${roleId}/rights`,
    method: 'post',
    data: { rids }
  })
}
// 左侧边栏菜单权限
export const leftmenus = () => {
  return axios({
    url: 'menus'
  })
}
