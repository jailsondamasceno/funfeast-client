<template>
  <q-page class="container">
    <div  class="q-pa-md">
      <div class="row justify-between">
      <div class="row justify-start text-h6">SOLICITAÇÕES DE CONVITES</div>
      </div>
<!--       <q-btn @click="buyModal = true" style="margin: 5px;" class="shadow-15" rounded color="white" icon="add"  text-color="primary" label="Fazer uma Recarga"></q-btn>
 -->    </div>
      <q-separator />
    <div class="row justify-center">
    <div class="walletItens">
      <q-card-section class="scroll">
    <div class="q-pa-md" v-for="invitation in resquestInvitations"
    :key="invitation.id">
    <q-list>
      <q-item style="border-radius: 5px;"  v-ripple class="item shadow-15">
    <q-item-section  class="description" style="padding: 5px;" avatar>
    <q-avatar  icon="event" />
    </q-item-section>
    <q-item-section  class="description" style="padding: 5px;">
      {{`${invitation.event_title}`}}
    </q-item-section>
      <q-item-section class="iconList" style="padding: 5px;" avatar>
        <q-btn flat round color="primary" icon="account_circle"  @click="openModalGetUser(invitation.id_requester)">
           <q-tooltip content-class="bg-secondary" :offset="[10, 10]">
          Ver requisitante!
        </q-tooltip>
        </q-btn>
    </q-item-section>
    <q-item-section class="user" style="padding: 5px; font-weight: bold;">
      {{`Enviado por: ${invitation.receiver_name}`}}
    </q-item-section>
    <q-item-section class="user" style="padding: 5px; font-weight: bold;">
      {{`Como: ${invitation.type}`}}
    </q-item-section>
    <q-item-section style="padding: 5px; font-weight: bold;">
      <q-btn @click="respRequestInvitation('ACCEPT', invitation)" style="margin: 5px;" class="shadow-15" rounded color="white" icon="thumb_up_alt"  text-color="primary" label="Aceitar"></q-btn>
    </q-item-section>
    <q-item-section style="padding: 5px; font-weight: bold;">
      <q-btn @click="respRequestInvitation('REJECT', invitation)" style="margin: 5px;" class="shadow-15" rounded color="white" icon="thumb_down_alt"  text-color="secondary" label="Recusar"></q-btn>
    </q-item-section>
  </q-item>
    </q-list>
    </div>
    </q-card-section>
    </div>
    </div>

    <q-dialog  v-model="modalGetUser">
       <q-card  class="row q-p-md justify-center  items-center" style="padding: 20px;" v-if="userById.name">
       <div class="q-pa-md">
          <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>
        <q-item-section>{{`${userById.name} ${userById.lastName}`}}</q-item-section>
      </q-item>
          <q-item>
        <q-item-section>
           <q-item-label>{{userById.country_name}}</q-item-label>
           <q-item-label caption>País</q-item-label>
        </q-item-section>
      </q-item>
          <q-item>
        <q-item-section>
           <q-item-label>{{userById.state_name}}</q-item-label>
           <q-item-label caption>Estado</q-item-label>
        </q-item-section>
      </q-item>
          <q-item>
        <q-item-section>
           <q-item-label>{{userById.city_name}}</q-item-label>
           <q-item-label caption>Cidade</q-item-label>
        </q-item-section>
      </q-item>
       <q-card-actions align="center">
         <q-btn  style="margin: 5px;" class="shadow-15" rounded color="white" icon="close"  text-color="secondary"  v-close-popup>Fechar</q-btn>
       </q-card-actions>
       </div>
       </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'requestInvitations',
  data () {
    return {
      filter: {},
      id: this.$route.params.idUser,
      modalGetUser: false
    }
  },
  computed: {
    ...mapState('usuarios', ['currentUser', 'resquestInvitations', 'userById']),
    colorBalance () {
      return this.balanceWallet <= 0 ? 'font-size: 40px; color: red;' : 'font-size: 40px; color: green;'
    }
  },
  methods: {
    ...mapActions('usuarios', ['getRequestsInvitations', 'approveOrDisapproveInvitation', 'getUserById']),
    buyCredit () {
      return false
    },
    openModalGetUser (idUser) {
      this.modalGetUser = true
      this.getUserById(idUser)
    },
    respRequestInvitation (type, resp) {
      const response = {
        id_requester: resp.id_requester,
        id_organizer: resp.id_organizer,
        id_requestInvitation: resp.id,
        id_event: resp.id_event,
        typeResponse: type,
        typeInvitation: resp.type
      }
      this.approveOrDisapproveInvitation(response)
    }
  },
  mounted () {
    this.filter.idUser = this.currentUser.id
    this.getRequestsInvitations(this.filter)
  }
}
</script>

<style lang="stylus" scoped>
  .walletItens{
     width 100%
  }
  @media (max-width: 600px) {
    .walletItens{
    width 100%
    }
  }
  @media (max-width: 768px) {
    .item{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    }
  }
  @media (max-width: 768px) {
    .user{
    display: flex;
    flex-direction: initial
    }
    .value{
    display: flex;
    flex-direction: initial
    }
    .iconList{
    display: flex;
    flex-direction: initial
    }
    .description{
    display: flex;
    flex-direction: initial
    }
  }
</style>
