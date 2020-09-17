import Vue from 'vue'
import { Notify, Loading } from 'quasar'
import { auth } from '../../../config/firebase'
import routes from '../../../router/index'

const getCodeCellphoneCountrys = async ({ commit }) => {
  try {
    const url = `${process.env.API}/getCodeCellphoneCountrys`
    const res = await Vue.prototype.$axios.get(url)
    commit('GET_CODE_CELLPHONE_COUNTRYS', res.data)
  } catch (err) {
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

const getCategoryProviders = async ({ commit }) => {
  try {
    Loading.show()
    const url = `${process.env.API}/getCategoryProviders`
    const res = await Vue.prototype.$axios.get(url)
    commit('GET_CATEGORY_PROVIDERS', res.data)
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

const getCategoryProvidersNoLoad = async ({ commit }) => {
  try {
    const url = `${process.env.API}/getCategoryProviders`
    const res = await Vue.prototype.$axios.get(url)
    commit('GET_CATEGORY_PROVIDERS', res.data)
  } catch (err) {
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

const signUp = async ({ commit, dispatch }, data) => {
  try {
    Loading.show()
    const us = await auth.auth().createUserWithEmailAndPassword(data.email, data.password)
    if (us) {
      const user = {
        uid: us.user.uid,
        email: data.email,
        cellfone: `+${data.codeCellphone.value}${data.cellfone}`,
        name: data.name,
        lastName: data.lastName,
        photoURL: '',
        profile: data.profile.value,
        category: data.category.value || '',
        typeProvider: data.typeProvider.value || '',
        cnpj: data.cnpj || '',
        company_name: data.company_name || '',
        country: data.country.value,
        state: data.state.value,
        city: data.city.value,
        street: data.street
      }
      const url = `${process.env.API}/saveUser`
      await Vue.prototype.$axios.post(url, user)
      commit('SIGNUP')
      Loading.hide()
    }
  } catch (err) {
    Loading.hide()
    const userDelet = await auth.auth().currentUser
    userDelet.delete()
    Notify.create({ // Vou criar um arquivo só para mensagens de notificação em um atquivo separado por idiomas
      type: 'warning',
      timeout: 2000,
      color: 'red',
      message: 'Algo deu errado!',
      position: 'top'
    })
    console.log(err)
  }
}
const login = async ({ commit }, dados) => {
  try {
    Loading.show()
    const us = await auth.auth().signInWithEmailAndPassword(dados.email, dados.senha)
    const url = `${process.env.API}/getUserById?id_user=${us.user.uid}`
    const user = await Vue.prototype.$axios.get(url)
    const token = auth.auth().currentUser.getIdToken()
    localStorage.setItem('currentUser', JSON.stringify(user.data))
    localStorage.setItem('firebaseToken', token)
    commit('LOGIN_SUCCESS', user.data)
    Loading.hide()
  } catch (err) {
    Loading.hide()
    Notify.create({ // Vou criar um arquivo só para mensagens de notificação em um atquivo separado por idiomas
      type: 'warning',
      timeout: 2000,
      color: 'red',
      message: 'Email ou senha inválidos!',
      position: 'top'
    })
    console.log(err)
  }
}

const logout = async ({ commit }) => {
  try {
    Loading.show()
    await auth.auth().signOut()
    commit('LOGOUT')
    Loading.hide()
  } catch (err) {
    Loading.hide()
    console.log(err)
  }
}

const resetPassWord = async ({ commit }, payload) => {
  try {
    Loading.show()

    Loading.hide()
  } catch (err) {
    Loading.hide()
    console.log(err)
  }
}

const editUser = async ({ commit }, user) => {
  try {
    Loading.show()
    const usr = {
      name: user.name,
      lastName: user.lastName,
      country: user.country.value,
      state: user.state.value,
      city: user.city.value,
      street: user.street
    }
    const url = `${process.env.API}/editUser?id_user=${user.id}`
    const urlGet = `${process.env.API}/getUserById?id_user=${user.id}`
    await Vue.prototype.$axios.put(url, usr)
    const newUser = await Vue.prototype.$axios.get(urlGet)
    commit('EDIT_USER', newUser.data)
    Loading.hide()
    Notify.create({
      type: 'success',
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

const getUserById = async ({ commit }, idUser) => {
  try {
    Loading.show()
    const url = `${process.env.API}/getUserById?id_user=${idUser}`
    const res = await Vue.prototype.$axios.get(url)
    commit('GET_USER_BY_ID', res.data)
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

const updatePassword = async ({ commit }, newPassword) => {
  try {
    Loading.show()
    const user = await auth.auth().currentUser
    await user.updatePassword(newPassword)
    Loading.hide()
    Notify.create({
      type: 'success',
      timeout: 2000,
      color: 'green',
      message: 'Salvo com sucesso!',
      position: 'top'
    })
    routes.push('/auth/sign-in')
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

const movimetationsWallet = async ({ commit }, idUser) => {
  try {
    Loading.show()
    const url = `${process.env.API}/movimetationsWallet?id_user=${idUser}`
    const res = await Vue.prototype.$axios.get(url)
    commit('MOVIMENTATIONS_WALLET', res.data)
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

const getUserByCellPhone = async ({ commit }, cellPhone) => {
  try {
    Loading.show()
    const url = `${process.env.API}/getUserByCellPhone?cellPhone=${cellPhone}`
    const res = await Vue.prototype.$axios.get(url)
    commit('GET_USER_BY_CELLPHONE', res.data)
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

const sendInvitation = async ({ commit }, invitation) => {
  try {
    Loading.show()
    const url = `${process.env.API}/sendInvitation`
    const res = await Vue.prototype.$axios.post(url, invitation)
    Loading.hide()
    Notify.create({
      type: 'success',
      timeout: 2000,
      color: 'green',
      message: `${res.data}`,
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

const getInvitatiosByUser = async ({ commit }, idUser) => {
  try {
    Loading.show()
    const url = `${process.env.API}/getInvitatiosByUser?id_user=${idUser}`
    const res = await Vue.prototype.$axios.get(url)
    commit('GET_INVITATION_BY_USER', res.data)
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

const responseInvitation = async ({ commit }, response) => {
  try {
    Loading.show()
    const url = `${process.env.API}/responseInvitation`
    const res = await Vue.prototype.$axios.post(url, response)
    commit('CLEAN_INVITATIONS', response.id_invitation)
    Loading.hide()
    Notify.create({
      type: 'success',
      timeout: 2000,
      color: 'green',
      message: `${res.data}`,
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

const resquestInvitation = async ({ commit }, response) => {
  try {
    Loading.show()
    const url = `${process.env.API}/resquestInvitation`
    const res = await Vue.prototype.$axios.post(url, response)
    Loading.hide()
    Notify.create({
      type: 'success',
      timeout: 2000,
      color: `${res.data.collor}`,
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

const approveOrDisapproveInvitation = async ({ commit }, response) => {
  try {
    Loading.show()
    const url = `${process.env.API}/approveOrDisapproveInvitation`
    const res = await Vue.prototype.$axios.post(url, response)
    commit('CLEAN_REQUEST_INVITATIONS', response.id_requestInvitation)
    Loading.hide()
    Notify.create({
      type: 'success',
      timeout: 2000,
      color: 'green',
      message: `${res.data}`,
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

const getRequestsInvitations = async ({ commit }, filter) => {
  try {
    Loading.show()
    const url = `${process.env.API}/getRequestsInvitations?id_user=${filter.idUser}`
    const res = await Vue.prototype.$axios.post(url, filter)
    commit('GET_REQUEST_INVITATIONS', res.data)
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

export {
  getCodeCellphoneCountrys,
  getCategoryProviders,
  getCategoryProvidersNoLoad,
  signUp,
  login,
  logout,
  resetPassWord,
  editUser,
  getUserById,
  updatePassword,
  movimetationsWallet,
  getUserByCellPhone,
  sendInvitation,
  getInvitatiosByUser,
  responseInvitation,
  resquestInvitation,
  approveOrDisapproveInvitation,
  getRequestsInvitations
}
