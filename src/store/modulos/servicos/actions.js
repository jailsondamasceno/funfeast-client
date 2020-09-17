import Vue from 'vue'
import { Notify, Loading } from 'quasar'
// import { auth } from '../../../config/firebase'
// import routes from '../../../router/index'

const servicesByProvider = async ({ commit }, idProvider) => {
  try {
    Loading.show()
    const url = `${process.env.API}/servicesByProvider?id_service_provider=${idProvider}`
    const res = await Vue.prototype.$axios.get(url)
    commit('GET_SERVICES_BY_PROVIDER', res.data)
    Loading.hide()
  } catch (err) {
    Loading.hide()
    Notify.create({
      type: 'warning',
      timeout: 2000,
      color: 'red',
      message: 'Algo deu errado!',
      position: 'top'
    })
    console.log(err)
  }
}

const addService = async ({ commit }, service) => {
  try {
    Loading.show()
    service.id_category = service.category.value
    const url = `${process.env.API}/addService`
    const res = await Vue.prototype.$axios.post(url, service)
    Loading.hide()
    Notify.create({
      type: 'warning',
      timeout: 2000,
      color: `${res.data.color}`,
      message: `${res.data.msg}`,
      position: 'top'
    })
  } catch (err) {
    Loading.hide()
    Notify.create({
      type: 'warning',
      timeout: 2000,
      color: 'red',
      message: 'Algo deu errado!',
      position: 'top'
    })
    console.log(err)
  }
}

const getServices = async ({ commit }, filter) => {
  try {
    Loading.show()
    const url = `${process.env.API}/getServices`
    const res = await Vue.prototype.$axios.post(url, filter)
    commit('GET_SERVICES', res.data)
    Loading.hide()
  } catch (err) {
    Loading.hide()
    Notify.create({
      type: 'warning',
      timeout: 2000,
      color: 'red',
      message: 'Algo deu errado!',
      position: 'top'
    })
    console.log(err)
  }
}

const clearServices = async ({ commit }) => {
  commit('CLEAR_SERVICES')
}

const SendBuyService = async ({ commit }, buy) => {
  try {
    Loading.show()
    const url = `${process.env.API}/buyService`
    await Vue.prototype.$axios.post(url, buy)
    Loading.hide()
    Notify.create({
      type: 'warning',
      timeout: 2000,
      color: 'green',
      message: 'Pedido feito com sucesso!',
      position: 'top'
    })
  } catch (err) {
    Loading.hide()
    Notify.create({
      type: 'warning',
      timeout: 2000,
      color: 'red',
      message: 'Algo deu errado!',
      position: 'top'
    })
    console.log(err)
  }
}

const servicesRequestsByProviders = async ({ commit }, filter) => {
  try {
    Loading.show()
    const url = `${process.env.API}/servicesRequestsByProviders`
    var res = await Vue.prototype.$axios.put(url, filter)
    commit('MY_REQUEST_SERVICES', res.data)
    Loading.hide()
  } catch (err) {
    Loading.hide()
    Notify.create({
      type: 'warning',
      timeout: 2000,
      color: 'red',
      message: 'Algo deu errado!',
      position: 'top'
    })
    console.log(err)
  }
}

const confirmOrRejectBuy = async ({ dispatch }, buy) => {
  try {
    Loading.show()
    const url = `${process.env.API}/confirmOrRejectBuy`
    await Vue.prototype.$axios.put(url, buy)
    const filter = { id_service_provider: buy.id_service_provider, status: '' }
    dispatch('servicesRequestsByProviders', filter)
    Loading.hide()
    Notify.create({
      type: 'warning',
      timeout: 2000,
      color: 'green',
      message: 'Salvo com sucesso!',
      position: 'top'
    })
  } catch (err) {
    Loading.hide()
    Notify.create({
      type: 'warning',
      timeout: 2000,
      color: 'red',
      message: 'Algo deu errado!',
      position: 'top'
    })
    console.log(err)
  }
}

export {
  servicesByProvider,
  addService,
  getServices,
  clearServices,
  SendBuyService,
  servicesRequestsByProviders,
  confirmOrRejectBuy
}
