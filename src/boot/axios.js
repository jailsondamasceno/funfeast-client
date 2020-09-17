import axios from 'axios'

export default async ({ Vue }) => {
  Vue.prototype.$axios = axios
  const firebaseToken = localStorage.getItem('firebaseToken')
  axios.defaults.headers.common['Authorization'] = firebaseToken
}
