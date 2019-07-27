import axios from '@/utils/myaxios.js'

export const getAllCateList = (type) => {
  return axios({
    url: 'categories',
    params: { type }
  })
}
