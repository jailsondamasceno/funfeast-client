import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

// import example from './module-example'
import usuarios from './modulos/usuarios'
import eventos from './modulos/eventos'
import servicos from './modulos/servicos'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */
const vuexPersist = new VuexPersist({
  key: 'feast',
  storage: window.localStorage
})

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      usuarios: usuarios,
      eventos: eventos,
      servicos: servicos
    },
    plugins: [vuexPersist.plugin],
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
