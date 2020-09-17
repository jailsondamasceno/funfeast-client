import routes from '../../../router/index'

const GET_CODE_CELLPHONE_COUNTRYS = (state, codes) => {
  state.codesCellphone = codes
}

const GET_CATEGORY_PROVIDERS = (state, categories) => {
  state.categoryProviders = categories
}

const SIGNUP = () => {
  routes.push('auth/sign-in')
}

const LOGIN_SUCCESS = (state, user) => {
  state.currentUser = user
  state.loginUserState = true
  routes.push('/eventos')
}

const LOGOUT = (state) => {
  state.currentUser = {}
  state.loginUserState = false
  localStorage.removeItem('fun_feast')
  localStorage.removeItem('currentUser')
  localStorage.removeItem('firebaseToken')
}

const EDIT_USER = (state, newUser) => {
  state.currentUser = newUser
  localStorage.setItem('currentUser', JSON.stringify(newUser.data))
}
const GET_USER_BY_ID = (state, user) => {
  state.userById = user
}

const MOVIMENTATIONS_WALLET = (state, reponse) => {
  state.wallet = reponse.movimentations
  state.balanceWallet = reponse.balance
}

const GET_USER_BY_CELLPHONE = (state, user) => {
  state.userCellphone = user
}

const GET_INVITATION_BY_USER = (state, invitations) => {
  state.invitationsUser = invitations
}

const CLEAN_INVITATIONS = (state, idInvitation) => {
  const invitations = state.invitationsUser
  for (var i = 0; i < invitations.length; i++) {
    if (invitations[i].id === idInvitation) {
      invitations.splice(i, 1)
    }
  }
  state.invitationsUser = invitations
}

const CLEAN_REQUEST_INVITATIONS = (state, idInvitation) => {
  const invitations = state.resquestInvitations
  for (var i = 0; i < invitations.length; i++) {
    if (invitations[i].id === idInvitation) {
      invitations.splice(i, 1)
    }
  }
  state.resquestInvitations = invitations
}

const GET_REQUEST_INVITATIONS = (state, requestInvitations) => {
  state.resquestInvitations = requestInvitations
}

export {
  GET_CODE_CELLPHONE_COUNTRYS,
  GET_CATEGORY_PROVIDERS,
  SIGNUP,
  LOGIN_SUCCESS,
  LOGOUT,
  EDIT_USER,
  GET_USER_BY_ID,
  MOVIMENTATIONS_WALLET,
  GET_USER_BY_CELLPHONE,
  GET_INVITATION_BY_USER,
  CLEAN_INVITATIONS,
  CLEAN_REQUEST_INVITATIONS,
  GET_REQUEST_INVITATIONS
}
