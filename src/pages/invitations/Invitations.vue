<template>
  <q-page class="container">
    <div  class="q-pa-md">
      <div class="row justify-between">
      <div class="row justify-start text-h6">CONVITES</div>
      </div>
<!--       <q-btn @click="buyModal = true" style="margin: 5px;" class="shadow-15" rounded color="white" icon="add"  text-color="primary" label="Fazer uma Recarga"></q-btn>
 -->    </div>
      <q-separator />
    <div class="row justify-center">
    <div class="walletItens">
      <q-card-section class="scroll">
    <div class="q-pa-md" v-for="invitation in invitationsUser"
    :key="invitation.id">
    <q-list>
      <q-item style="border-radius: 5px;"  v-ripple class="item shadow-15">
    <q-item-section class="iconList" style="padding: 5px;" avatar>
        <q-btn flat round color="primary" icon="remove_red_eye"  @click="eventDetail(invitation.id_event)"/>
    </q-item-section>
    <q-item-section  class="description" style="padding: 5px;">
      {{`Evento: ${invitation.event_title}`}}
    </q-item-section>
    <q-item-section class="user" style="padding: 5px; font-weight: bold;">
      {{`Enviado por: ${invitation.sender_name}`}}
    </q-item-section>
    <q-item-section class="user" style="padding: 5px; font-weight: bold;">
      {{`Como: ${invitation.type}`}}
    </q-item-section>
    <q-item-section style="padding: 5px; font-weight: bold;">
      <q-btn @click="respInvitation('ACCEPT', invitation)" style="margin: 5px;" class="shadow-15" rounded color="white" icon="thumb_up_alt"  text-color="primary" label="Aceitar"></q-btn>
    </q-item-section>
    <q-item-section style="padding: 5px; font-weight: bold;">
      <q-btn @click="respInvitation('REJECT', invitation)" style="margin: 5px;" class="shadow-15" rounded color="white" icon="thumb_down_alt"  text-color="secondary" label="Recusar"></q-btn>
    </q-item-section>
  </q-item>
    </q-list>
    </div>
    </q-card-section>
    </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Invitations',
  data () {
    return {
      creditoValue: '',
      buyModal: false
    }
  },
  computed: {
    ...mapState('usuarios', ['currentUser', 'invitationsUser']),
    colorBalance () {
      return this.balanceWallet <= 0 ? 'font-size: 40px; color: red;' : 'font-size: 40px; color: green;'
    }
  },
  methods: {
    ...mapActions('usuarios', ['getInvitatiosByUser', 'responseInvitation']),
    buyCredit () {
      return false
    },
    eventDetail (id) {
      this.$router.push(`eventoDetalhe/${id}`)
    },
    respInvitation (type, resp) {
      const response = {
        id_receiver: resp.id_receiver,
        id_invitation: resp.id,
        id_event: resp.id_event,
        typeResponse: type,
        typeInvitation: resp.type
      }
      this.responseInvitation(response)
    }
  },
  mounted () {
    this.getInvitatiosByUser(this.currentUser.id)
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
