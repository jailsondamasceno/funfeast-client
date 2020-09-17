// import routes from '../../../router/index'

const GET_SERVICES_BY_PROVIDER = (state, services) => {
  state.myServices = services
}

const GET_SERVICES = (state, response) => {
  var servs = state.services
  response.services.forEach(service => {
    if (service.id !== response.last.id) {
      servs.push(service)
    }
    if (service.id === response.last.id && response.loadMore === false) {
      servs.push(service)
    }
  })
  state.services = servs
  state.lastService = response.last
  state.loadMore = response.loadMore
}

const CLEAR_SERVICES = (state) => {
  state.services = []
  state.lastService = ''
}

const MY_REQUEST_SERVICES = (state, buys) => {
  state.myRequestServices = buys
}
export {
  GET_SERVICES_BY_PROVIDER,
  GET_SERVICES,
  CLEAR_SERVICES,
  MY_REQUEST_SERVICES
}
