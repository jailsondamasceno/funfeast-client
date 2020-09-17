<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="tune"/>
        </q-btn>

        <q-toolbar-title>
          Fun Feast
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
    <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
      <q-list padding>
        <q-item-label header>Menu</q-item-label>
         <q-item :to="{name:'dashboard'}">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>
        <q-item :to="{name:'config'}">
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Configurações</q-item-label>
          </q-item-section>
        </q-item>
        <q-item :to="{name:'wallet'}">
          <q-item-section avatar>
            <q-icon name="account_balance_wallet" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Carteira</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/eventos">
          <q-item-section avatar>
            <q-icon name="event" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Eventos</q-item-label>
            <q-item-label caption>Meus eventos</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/invitations">
          <q-item-section avatar>
            <q-icon name="card_giftcard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Convites enviados</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/requestInvitations">
          <q-item-section avatar>
            <q-icon name="drafts" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Convites recebidos</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/serviceRequestsBuy">
          <q-item-section avatar>
            <q-icon name="shop" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Solicitações de Serviços</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/myServices">
          <q-item-section avatar>
            <q-icon name="storefront" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Meus Serviços</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/services">
          <q-item-section avatar>
            <q-icon name="storefront" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Serviços</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/auth/sign-in">
          <q-item-section avatar>
            <q-icon name="transit_enterexit"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Sair</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
        <q-img class="absolute-top" src="../assets/image_cover_default.jpg" style="height: 150px">
          <div class="absolute-center bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <q-icon name="account_circle" size="56px"/>
            </q-avatar>
            <div class="text-weight-bold">Jailson</div>
            <div>@jarvis</div>
          </div>
        </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import { mapActions } from 'vuex'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    ...mapActions('usuarios', ['logout']),
    openURL
  }
}
</script>

<style>
</style>
