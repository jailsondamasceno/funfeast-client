/* import Vue from 'vue' */
/* import store from '../store/index' */

const routes = [
  { // Rotas Auth
    path: '/auth',
    redirect: 'sign-in',
    component: () => import('layouts/auth'),
    children: [{
      path: 'sign-in',
      name: 'signIn',
      component: () => import('pages/auth/Login')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('pages/auth/SignUp')
    }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    meta: { requireAuth: true },
    children: [
      /*  { path: '/', name: '', component: () => import('pages/dashboard/Dashboard') }, */
      { path: '/dashboard', name: 'dashboard', component: () => import('pages/dashboard/Dashboard') },
      { path: '/config', name: 'config', component: () => import('pages/config/Config') },
      { path: '/wallet', name: 'wallet', component: () => import('pages/wallet/Wallet') },
      { path: '/eventos', name: 'eventos', component: () => import('pages/eventos/Eventos') },
      { path: '/invitations', name: 'invitations', component: () => import('pages/invitations/Invitations') },
      { path: '/requestInvitations', name: 'requestInvitations', component: () => import('pages/requestInvitations/RequestInvitations') },
      { path: '/eventoDetalhe/:id', name: 'eventoDetalhe', component: () => import('pages/eventos/EventoDetalhe') },
      { path: '/sponsorDetail/:idSponsor', name: 'sponsorDetail', component: () => import('pages/sponsors/SponsorDetail') },
      { path: '/guestDetail/:idGuest', name: 'guestDetail', component: () => import('pages/guests/GuestDetail') },
      { path: '/myServices', name: 'myServices', component: () => import('pages/services/MyServices') },
      { path: '/services', name: 'services', component: () => import('pages/services/SearchServices') },
      { path: '/serviceRequestsBuy', name: 'servicesRequestsBuy', component: () => import('pages/services/ServiceRequestsBuy') }
    ]
  }
]

// Always leave this as last one
/* if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
} */

export default routes
