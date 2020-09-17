
const GET_COUNTRYS = (state, countrys) => {
  state.countrys = countrys
}

const GET_STATES = (state, states) => {
  state.states = states
}
const GET_CITYS = (state, citys) => {
  state.citys = citys
}
const GET_CATEGORY_EVENTS = (state, categories) => {
  state.categoryEvents = categories
}
const GET_EVENTS = (state, response) => {
  var evens = state.events
  response.events.forEach(event => {
    if (event.id !== response.last.id) {
      evens.push(event)
    }
    if (event.id === response.last.id && response.loadMore === false) {
      evens.push(event)
    }
  })
  state.events = evens
  state.lastEvent = response.last
  state.loadMoreEvents = response.loadMore
}
const EVENTS_BY_ORGANIZER = (state, events) => {
  state.eventsCreatedForMe = events
}

const GET_EVENT_BY_ID = (state, event) => {
  state.eventArrived = true
  state.eventDetail = event
}
const EVENT_CLEAR = (state) => {
  state.eventArrived = false
}

const CLEAR_EVENTS = (state) => {
  state.events = []
  state.lastEvent = ''
}

const SPONSORS_BY_EVENT = (state, sponsors) => {
  state.sponsors = sponsors
}

const GET_SPONSOR = (state, sponsor) => {
  state.sponsorDetail = sponsor
  state.sponsorDetail.clear = false
}

const SPONSOR_CLEAR = (state) => {
  state.sponsorDetail.clear = true
}

const LIKE_EVENT = (state, event) => {
  state.eventDetail = event
}

const GUESTS_BY_EVENT = (state, guests) => {
  state.guests = guests
}

const GET_GUEST = (state, guest) => {
  state.guestDetail = guest
  state.guestDetail.clear = false
}

const GUEST_CLEAR = (state) => {
  state.guestDetail.clear = true
}

const SERVICES_REQUESTS_BY_EVENT = (state, services) => {
  state.requestServicesEvent = services
}

const SERVICE_CLEAR = (state) => {
  state.requestServicesEvent = []
}

const MOVIMENTATIONS_SAFE_BOX = (state, response) => {
  state.safeBox = response.movimentations
  state.balanceSafeBoxe = response.balance
}

const SAFE_BOX_CLEAR = (state) => {
  state.safeBox = []
  state.balanceSafeBoxe = 0
}

export {
  GET_COUNTRYS,
  GET_STATES,
  GET_CITYS,
  GET_CATEGORY_EVENTS,
  GET_EVENTS,
  EVENTS_BY_ORGANIZER,
  GET_EVENT_BY_ID,
  EVENT_CLEAR,
  CLEAR_EVENTS,
  SPONSORS_BY_EVENT,
  GET_SPONSOR,
  SPONSOR_CLEAR,
  LIKE_EVENT,
  GUESTS_BY_EVENT,
  GET_GUEST,
  GUEST_CLEAR,
  SERVICES_REQUESTS_BY_EVENT,
  SERVICE_CLEAR,
  MOVIMENTATIONS_SAFE_BOX,
  SAFE_BOX_CLEAR
}
