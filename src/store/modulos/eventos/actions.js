import Vue from 'vue'
import { Notify, Loading } from 'quasar'

const getCountrys = async ({ commit }) => {
  try {
    const url = `${process.env.API}/getCountrys`
    const res = await Vue.prototype.$axios.post(url)
    const countrys = res.data.map(country => {
      return { label: country.country, value: country.id }
    })
    commit('GET_COUNTRYS', countrys)
  } catch (err) {
    console.log(err)
  }
}
const getStates = async ({ commit }, country) => {
  try {
    Loading.show()
    const url = `${process.env.API}/getStates?id_country=${country.value}`
    const res = await Vue.prototype.$axios.post(url)
    const states = res.data.map(state => {
      return { label: state.state, value: state.id }
    })
    commit('GET_STATES', states)
    Loading.hide()
  } catch (err) {
    Loading.hide()
    console.log(err)
  }
}
const getCitys = async ({ commit }, payload) => {
  try {
    Loading.show()
    const url = `${process.env.API}/getCitys?id_country=${payload.country.value}&id_state=${payload.state.value}`
    const res = await Vue.prototype.$axios.post(url)
    const citys = res.data.map(city => {
      return { label: city.city, value: city.id }
    })
    commit('GET_CITYS', citys)
    Loading.hide()
  } catch (err) {
    Loading.hide()
    console.log(err)
  }
}
const getCategoryEvents = async ({ commit }) => {
  try {
    const url = `${process.env.API}/getCategoryEvents`
    const res = await Vue.prototype.$axios.get(url)
    commit('GET_CATEGORY_EVENTS', res.data)
  } catch (err) {
    console.log(err)
  }
}

const addEvent = async ({ dispatch }, event) => {
  try {
    Loading.show()
    const evt = {
      id_organizer: event.id_organizer,
      sponsors: [],
      service_providers: [],
      guests: [],
      title: event.title,
      category: event.category.value,
      description: event.description,
      public: event.public.value,
      date: event.date,
      hour: event.hour,
      status: event.status,
      url_image: event.url_image || '',
      country: event.country.value,
      state: event.state.value,
      city: event.city.value,
      street: event.street || ''
    }
    const url = `${process.env.API}/addEvent`
    await Vue.prototype.$axios.post(url, evt)
    dispatch('getEvents')
    Loading.hide()
    Notify.create({
      type: 'warning',
      timeout: 2000,
      color: 'green',
      message: 'Evento adicionado com sucesso!',
      position: 'top'
    })
  } catch (err) {
    Loading.hide()
    Notify.create({
      type: 'warning',
      timeout: 2000,
      color: 'red',
      message: 'Ops! Algo inesperado aconteceu!',
      position: 'top'
    })
    console.log(err)
  }
}
const getEvents = async ({ commit }, filter) => {
  try {
    Loading.show()
    const url = `${process.env.API}/getEvents`
    const res = await Vue.prototype.$axios.post(url, filter)

    res.data.events.map(event => {
      event.date = new Date(parseInt(event.date)).toLocaleDateString('pt-BR')
      return event
    })
    commit('GET_EVENTS', res.data)
    Loading.hide()
  } catch (err) {
    Loading.hide()
    console.log(err)
  }
}
const eventsByOrganizer = async ({ commit }, idOrganizer) => {
  try {
    Loading.show()
    const url = `${process.env.API}/eventsByOrganizer?id_organizer=${idOrganizer}`
    const res = await Vue.prototype.$axios.get(url)
    commit('EVENTS_BY_ORGANIZER', res.data)
    Loading.hide()
  } catch (err) {
    Loading.hide()
    console.log(err)
  }
}
const getEventById = async ({ commit }, id) => {
  try {
    Loading.show()
    const url = `${process.env.API}/getEventById?id_event=${id}`
    const res = await Vue.prototype.$axios.get(url)
    const event = await res.data
    event.date = new Date(parseInt(event.date)).toLocaleDateString('pt-BR')
    commit('GET_EVENT_BY_ID', event)
    Loading.hide()
  } catch (err) {
    Loading.hide()
    console.log(err)
  }
}
const eventClear = async ({ commit }) => {
  commit('EVENT_CLEAR')
}

const clearEvents = async ({ commit }) => {
  commit('CLEAR_EVENTS')
}

const sponsorsByEvent = async ({ commit }, idEvent) => {
  try {
    Loading.show()
    commit('SPONSOR_CLEAR')
    const url = `${process.env.API}/sponsorsByEvent?id_event=${idEvent}`
    const res = await Vue.prototype.$axios.get(url)
    commit('SPONSORS_BY_EVENT', res.data)
    Loading.hide()
  } catch (err) {
    Loading.hide()
    Notify.create({
      type: 'warning',
      timeout: 2000,
      color: 'red',
      message: 'Ops! Algo inesperado aconteceu!',
      position: 'top'
    })
    console.log(err)
  }
}

const getSponsor = async ({ commit }, idSponsor) => {
  try {
    Loading.show()
    commit('SPONSOR_CLEAR')
    const url = `${process.env.API}/getUserById?id_user=${idSponsor}`
    const res = await Vue.prototype.$axios.get(url)
    commit('GET_SPONSOR', res.data)
    Loading.hide()
  } catch (err) {
    Loading.hide()
    Notify.create({
      type: 'warning',
      timeout: 2000,
      color: 'red',
      message: 'Ops! Algo inesperado aconteceu!',
      position: 'top'
    })
    console.log(err)
  }
}

const likeEvent = async ({ commit }, like) => {
  try {
    Loading.show()
    const url = `${process.env.API}/likeEvent`
    await Vue.prototype.$axios.post(url, like)
    const urlEvent = `${process.env.API}/getEventById?id_event=${like.id_event}`
    const res = await Vue.prototype.$axios.get(urlEvent)
    commit('LIKE_EVENT', res.data)
    Notify.create({
      timeout: 2000,
      color: 'green',
      message: 'Obrigado pelo seu like!',
      position: 'top'
    })
    Loading.hide()
  } catch (err) {
    Loading.hide()
    Notify.create({
      type: 'warning',
      timeout: 2000,
      color: 'red',
      message: 'Ops! Algo inesperado aconteceu!',
      position: 'top'
    })
    console.log(err)
  }
}

const guestsByEvent = async ({ commit }, idEvent) => {
  try {
    Loading.show()
    commit('GUEST_CLEAR')
    const url = `${process.env.API}/guestsByEvent?id_event=${idEvent}`
    const res = await Vue.prototype.$axios.get(url)
    commit('GUESTS_BY_EVENT', res.data)
    Loading.hide()
  } catch (err) {
    Loading.hide()
    Notify.create({
      type: 'warning',
      timeout: 2000,
      color: 'red',
      message: 'Ops! Algo inesperado aconteceu!',
      position: 'top'
    })
    console.log(err)
  }
}

const getGuest = async ({ commit }, idGuest) => {
  try {
    Loading.show()
    commit('GUEST_CLEAR')
    const url = `${process.env.API}/getUserById?id_user=${idGuest}`
    const res = await Vue.prototype.$axios.get(url)
    commit('GET_GUEST', res.data)
    Loading.hide()
  } catch (err) {
    Loading.hide()
    Notify.create({
      type: 'warning',
      timeout: 2000,
      color: 'red',
      message: 'Ops! Algo inesperado aconteceu!',
      position: 'top'
    })
    console.log(err)
  }
}

const servicesRequestsByEvent = async ({ commit }, filtro) => {
  try {
    commit('SERVICE_CLEAR')
    Loading.show()
    const url = `${process.env.API}/servicesRequestsByEvent`
    const res = await Vue.prototype.$axios.post(url, filtro)
    commit('SERVICES_REQUESTS_BY_EVENT', res.data)
    Loading.hide()
  } catch (err) {
    Loading.hide()
    Notify.create({
      type: 'warning',
      timeout: 2000,
      color: 'red',
      message: 'Ops! Algo inesperado aconteceu!',
      position: 'top'
    })
    console.log(err)
  }
}

const depositWalletForSafeBox = async ({ commit }, deposit) => {
  try {
    Loading.show()
    const url = `${process.env.API}/depositWalletForSafeBox`
    const res = await Vue.prototype.$axios.post(url, deposit)
    Loading.hide()
    Notify.create({
      timeout: 2000,
      color: 'green',
      message: `${res.data}`,
      position: 'top'
    })
  } catch (err) {
    var error = JSON.parse(JSON.stringify(err))
    Loading.hide()
    Notify.create({
      type: 'warning',
      timeout: 2000,
      color: 'red',
      message: `${error.response.data}`,
      position: 'top'
    })
    console.log(error)
  }
}
const movimetationsSafeBox = async ({ commit }, idEvent) => {
  try {
    commit('SAFE_BOX_CLEAR')
    Loading.show()
    const url = `${process.env.API}/movimetationsSafeBox?id_event=${idEvent}`
    const res = await Vue.prototype.$axios.get(url)
    commit('MOVIMENTATIONS_SAFE_BOX', res.data)
    Loading.hide()
  } catch (err) {
    Loading.hide()
    Notify.create({
      type: 'warning',
      timeout: 2000,
      color: 'red',
      message: 'Ops! Algo inesperado aconteceu!',
      position: 'top'
    })
    console.log(err)
  }
}

export {
  getCountrys,
  getStates,
  getCitys,
  getCategoryEvents,
  addEvent,
  getEvents,
  eventsByOrganizer,
  getEventById,
  eventClear,
  clearEvents,
  sponsorsByEvent,
  getSponsor,
  likeEvent,
  guestsByEvent,
  getGuest,
  servicesRequestsByEvent,
  depositWalletForSafeBox,
  movimetationsSafeBox
}
