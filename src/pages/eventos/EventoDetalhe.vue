<template>
  <q-page class="container q-pa-md">
    <div class="row q-p-md justify-start" style="padding: 20px;">
        <q-btn @click="getSafeBox()" class="shadow-15 buttons" rounded color="white" icon="monetization_on"  text-color="primary" label="Cofre do evento" />
        <q-btn @click="getServices()" class="shadow-15 buttons" rounded color="white" icon="shopping_cart"  text-color="primary" label="Serviços contratados" />
        <q-btn @click="getSponsors()" class="shadow-15 buttons" rounded color="white" icon="supervised_user_circle"  text-color="secondary" label="Patrocinadores" />
        <q-btn @click="getGuests()" class="shadow-15 buttons" rounded color="white" icon="supervisor_account"  text-color="secondary" label="Convidados" />
        <q-btn @click="openModalRequestInvitation(typeRequeInvitation = 'PATROCINADOR')" class="shadow-15 buttons" rounded color="white" text-color="secondary" label="Seja um Patrocinador" />
        <q-btn @click="openModalRequestInvitation(typeRequeInvitation = 'CONVIDADO')" class="shadow-15 buttons" rounded color="white" text-color="secondary" label="Seja um convidado" />
    </div>
<!--      <q-dialog full-width v-model="openImages">
          <div class="q-pa-md">
             <q-img style="max-width: 100%; max-height: 100%;" src="https://christmas.365greetings.com/wp-content/uploads/2018/12/shutterstock_536244034.jpg"></q-img>
          </div>
        </q-dialog> -->
     <div class="col-xs-12 col-sm-12 col-md-3 col-lg-2 col-xl-2">
        <q-card class="my-card" v-if="eventArrived==true">
          <q-card-actions align="start">
            <q-chip outline color="secondary" text-color="white" icon-right="favorite">{{eventDetail.likes}}</q-chip>
         <!--    <q-btn @click="openImages=true" flat round color="secondary" icon="photo"/> -->
            <q-btn @click="shareEvent()" outline round color="primary" icon="share"/>
          </q-card-actions>
          <q-list>
            <q-item>
              <q-item-section>
                <div class="text-h6">{{eventDetail.title}}</div>
              </q-item-section>
            </q-item>
            <div class="row q-pa-md justify-between">
            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name="perm_identity"/>
              </q-item-section>
              <q-item-section>
                <div class="text-subtitle2">{{eventDetail.organizer}}</div>
                <q-item-label caption>Organizador</q-item-label>
              </q-item-section>
            </q-item>
            <q-item >
              <q-item-section avatar>
                <q-icon color="primary" name="today"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{eventDetail.date}}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item >
              <q-item-section avatar>
                <q-icon color="primary" name="access_time"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{eventDetail.hour}}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item >
              <q-item-section avatar>
                <q-icon color="red" name=""/>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{eventDetail.country_name}}</q-item-label>
                <q-item-label caption>País</q-item-label>
              </q-item-section>
            </q-item>

            <q-item >
              <q-item-section avatar>
                <q-icon color="red" name=""/>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{eventDetail.state_name}}</q-item-label>
                <q-item-label caption>Estado</q-item-label>
              </q-item-section>
            </q-item>

            <q-item >
              <q-item-section avatar>
                <q-icon color="red" name=""/>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{eventDetail.city_name}}</q-item-label>
                <q-item-label caption>Cidade</q-item-label>
              </q-item-section>
            </q-item>
            </div>
            <q-card-section>
              {{ eventDetail.description }}
            </q-card-section>
            <q-item clickable>
             <q-btn  rounded color="white" icon="favorite_border"  text-color="secondary" @click="likeEvent({id_user: currentUser.id, id_event: eventDetail.id })" label="Like" />
            </q-item>
          </q-list>
        </q-card>
   </div>

   <q-dialog
     v-model="sponsorsModal"
     full-height>
       <q-card>
        <q-card-section>
          <div class="text-h6">PATROCINADORES</div>
        <div class="row q-p-md justify-start" style="padding: 10px;">
         <q-btn  style="margin: 5px;" class="shadow-15" rounded color="white" icon="close"  text-color="primary"  v-close-popup></q-btn>
         <q-btn  style="margin: 5px;" class="shadow-15" rounded color="white" icon="add"  text-color="primary" @click="openModalSendInvitations(typeInvitation = 'SPONSOR')" label="Convidar" />
       </div>
        </q-card-section>
         <q-separator />
         <q-card-section style="max-height: 60vh; min-height: 60vh" class="scroll">
       <div class="q-pa-md" v-for="sponsor in sponsors"
        :key="sponsor.id">
       <q-list>
          <q-item style="border-radius: 5px;" @click="sponsorDetail(sponsor.id)" clickable v-ripple class="shadow-15">
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>
        <q-item-section>{{`${sponsor.name} ${sponsor.lastName}`}}</q-item-section>
      </q-item>
       </q-list>
       </div>
        </q-card-section>
       </q-card>
   </q-dialog>
   <q-dialog
     v-model="guestsModal"
     full-height>
       <q-card>
        <q-card-section>
          <div class="text-h6">CONVIDADOS</div>
        <div class="row q-p-md justify-start" style="padding: 10px;">
         <q-btn  style="margin: 5px;" class="shadow-15" rounded color="white" icon="close"  text-color="primary"  v-close-popup></q-btn>
         <q-btn  style="margin: 5px;" class="shadow-15" rounded color="white" icon="add"  text-color="primary" @click="openModalSendInvitations(typeInvitation = 'GUEST')" label="Convidar" />
       </div>
        </q-card-section>
         <q-separator />
         <q-card-section style="max-height: 60vh; min-height: 60vh" class="scroll">
       <div class="q-pa-md" v-for="guest in guests"
        :key="guest.id">
       <q-list>
          <q-item style="border-radius: 5px;" @click="guestDetail(guest.id)" clickable v-ripple class="shadow-15">
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>
        <q-item-section>{{`${guest.name} ${guest.lastName}`}}</q-item-section>
      </q-item>
       </q-list>
       </div>
        </q-card-section>
       </q-card>
   </q-dialog>
   <q-dialog v-model="modalShare">
     <q-card>
        <q-card-section>
          <div class="text-h6">Copie o conteúdo</div>
        </q-card-section>
        <q-card-section>
          <p>{{share}}</p>
        </q-card-section>
        <q-card-actions align="right">
         <q-btn class="shadow-15" rounded color="white" icon="filter_none"  text-color="primary" @click="copy()" label="Copiar"/>
        </q-card-actions>
     </q-card>
   </q-dialog>
   <q-dialog v-model="modalRequests" persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down">
      <q-card>
          <q-space />
          <div style="padding: 5px;">
          <q-btn class="shadow-15" rounded color="white" icon="close"  text-color="primary"  v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Fechar</q-tooltip>
          </q-btn>
          </div>
        <q-card-section>
          <div class="text-h6">SERVIÇOS PARA O EVENTO</div>
        </q-card-section>
         <q-separator/>
        <div class="scroll">
        <div class="row q-gutter-md justify-center">
        <div v-for="request in requestServicesEvent"
        :key="request.id">
          <q-card style="width:300px; padding: 10px; margin: 20px; border-radius: 10px;">
            <div class="row q-gutter-md justify-center">
                <q-avatar>
                   <q-icon style="font-size: 2em;" name="shopping_cart" />
                 </q-avatar>
            </div>
            <div>
             <q-item>
              <q-item-section>
                <div class="text-h6">{{request.title}}</div>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name="notes"/>
              </q-item-section>
              <q-item-section>
                <div class="text-subtitle2">{{request.description}}</div>
                <q-item-label caption>Descrição</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name="group_work"/>
              </q-item-section>
              <q-item-section>
                <div class="text-subtitle2">{{request.service_provider_name}}</div>
                <q-item-label caption>Fornecedor</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name="monetization_on"/>
              </q-item-section>
              <q-item-section>
                <div class="text-subtitle2">{{`R$ ${request.value}`}}</div>
                <q-item-label caption>valor</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section avatar>
                <q-icon color="primary" name="access_time"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{request.status}}</q-item-label>
                <q-item-label caption>status</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-if="request.annotation">
              <q-item-section avatar>
                <q-icon color="primary" name="notification_important"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{request.annotation}}</q-item-label>
                <q-item-label caption>Anotação</q-item-label>
              </q-item-section>
            </q-item>
            </div>
          </q-card>
        </div>
        </div>
        </div>
      </q-card>
   </q-dialog>
    <q-dialog
     v-model="safeBoxModal"
     full-height>
       <q-card>
        <q-card-section>
          <div style="align-content: center; padding-bottom: 10px;" class="text-h6">MOVIMENTAÇÕES</div>
          <div style="padding-bottom: 10px;" class="text-h5"><span style="font-size: 30px;">{{`Saldo: `}}<span :style="colorBalance">{{`R$ ${balanceSafeBoxe},00`}}</span></span></div>
          <q-btn style="margin: 5px;" class="shadow-15" rounded color="white" icon="close"  text-color="primary"  v-close-popup></q-btn>
          <q-btn @click="makeDeposit()" style="margin: 5px;" class="shadow-15" rounded color="white" icon="add"  text-color="primary" label="Novo Depósito"></q-btn>
        </q-card-section>
         <q-separator />
         <q-card-section style="max-height: 60vh;" class="scroll">
       <div class="q-pa-md" v-for="movimentation in safeBox"
        :key="movimentation.id">
       <q-list>
          <q-item style="border-radius: 5px;" clickable v-ripple class="shadow-15">
        <q-item-section style="padding: 5px;" avatar>
          <q-avatar v-if="movimentation.type === 'CREDITO'">
           <q-icon name="add" color="green" />
          </q-avatar>
          <q-avatar v-else>
           <q-icon name="remove" color="red" />
          </q-avatar>
        </q-item-section>
        <q-item-section style="padding: 5px;">
          {{`${movimentation.description}`}}
        </q-item-section>
        <q-item-section style="padding: 5px; font-weight: bold;">
          {{`R$ ${movimentation.value}`}}
        </q-item-section>
      </q-item>
       </q-list>
       </div>
        </q-card-section>
         <q-separator />
       </q-card>
   </q-dialog>
    <q-dialog v-model="depositModal">
        <q-card>
          <div class="col content-center items-center">
            <div class="row q-pa-md justify-center">
              <q-avatar>
                 <q-icon style="font-size: 2em;" name="monetization_on" />
              </q-avatar>
            </div>
        <q-card-section>
          <q-input
            rounded
            outlined
            type="number"
            v-model="depositValue"
            label="Valor"
            lazy-rules
             :rules="[ val => val && val.length > 0 || 'Valor Inválido!']"
          />
        </q-card-section>
        <div class="row q-pa-md justify-center">
        <q-card-actions>
           <q-btn @click="toDoDeposit()" label="Depositar" type="submit" color="primary"/>
           <q-btn  label="Cancelar" type="submit" color="secondary"  v-close-popup/>
        </q-card-actions>
        </div>
         </div>
         </q-card>
    </q-dialog>

    <q-dialog v-model="sendInvitationModal">
      <q-card>
        <q-card-section>
          <div class="text-h6">BUSCAR USUÁRIO POR TELEFONE</div>
        </q-card-section>
         <q-separator />
        <q-card-section>
            <q-input
            rounded
            outlined
            type = 'number'
            v-model="cellPhoneUser"
            label="Código país + código áriea + telefone"
          />
        </q-card-section>
        <q-separator/>
        <q-card-section class="scroll">
       <div class="q-pa-md" v-for="userCell in userCellphone"
        :key="userCell.id">
       <q-list>
          <q-item @click="sendInvit(userCell.id)" style="border-radius: 5px;" clickable v-ripple class="shadow-15">
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>
        <q-item-section>{{`${userCell.name} ${userCell.lastName}`}}</q-item-section>
      </q-item>
       </q-list>
       </div>
        </q-card-section>
         <q-separator />
        <q-card-actions class="row q-p-md justify-around" style="padding: 10px;">
         <q-btn class="shadow-15" rounded color="white" icon="search"  text-color="primary" @click="getUserByCellPhone(cellPhoneUser)" label="Buscar"/>
         <q-btn class="shadow-15" rounded color="white" icon="close"  text-color="secondary" label="Cancelar"  v-close-popup></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="requestInvitationModal">
      <q-card>
        <q-card-section>
          <div class="text-h6 row q-pa-md justify-center">ENVIAR PEDIDO</div>
        </q-card-section>
         <div class="q-pa-md">
        <q-item-label caption>Ao receber seu pedido para ser um {{typeRequeInvitation}}, o organizador do evento irá analizar seu pedido e poderá aprovar ou recusar!</q-item-label>
        </div>
         <q-separator />
         <q-card-actions align="center">
         <q-btn  style="margin: 5px;" class="shadow-15" rounded color="white" icon="close"  text-color="secondary"  v-close-popup></q-btn>
         <q-btn  style="margin: 5px;" class="shadow-15" rounded color="white" icon="navigation"  text-color="primary" @click="sendRequestInvitation()" label="Enviar" />
         </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'detalheEvento',
  data () {
    return {
      maximizedToggle: true,
      slide: 1,
      openImages: false,
      sponsorsModal: false,
      guestsModal: false,
      modalRequests: false,
      safeBoxModal: false,
      depositModal: false,
      sendInvitationModal: false,
      requestInvitationModal: false,
      depositValue: '',
      eventoAtual: {},
      id: this.$route.params.id,
      modalShare: false,
      share: '',
      filtro: {},
      cellPhoneUser: '',
      typeInvitation: '',
      typeRequeInvitation: ''
    }
  },
  computed: {
    ...mapState('eventos', ['eventDetail', 'eventArrived', 'sponsors', 'guests',
      'requestServicesEvent', 'safeBox', 'balanceSafeBoxe']),
    ...mapState('usuarios', ['currentUser', 'userCellphone']),
    colorBalance () {
      return this.balanceWallet <= 0 ? 'font-size: 30px; color: red;' : 'font-size: 30px; color: green;'
    }
  },
  methods: {
    ...mapActions('eventos', ['getEventById', 'eventClear', 'sponsorsByEvent', 'guestsByEvent',
      'likeEvent', 'servicesRequestsByEvent', 'movimetationsSafeBox', 'depositWalletForSafeBox']),
    ...mapActions('usuarios', ['getUserByCellPhone', 'sendInvitation', 'resquestInvitation']),
    sponsorDetail (idSponsor) {
      this.$router.push(`/sponsorDetail/${idSponsor}`)
    },
    guestDetail (idGuest) {
      this.$router.push(`/guestDetail/${idGuest}`)
    },
    getSponsors () {
      this.sponsorsByEvent(this.id)
      this.sponsorsModal = true
    },
    getGuests () {
      this.guestsByEvent(this.id)
      this.guestsModal = true
    },
    getServices () {
      this.filtro.id_event = this.eventDetail.id
      this.servicesRequestsByEvent(this.filtro)
      this.modalRequests = true
    },
    getSafeBox () {
      this.movimetationsSafeBox(this.eventDetail.id)
      this.safeBoxModal = true
    },
    makeDeposit () {
      this.safeBoxModal = false
      this.depositModal = true
    },
    toDoDeposit () {
      const deposit = {
        id_user: this.currentUser.id,
        id_event: this.eventDetail.id,
        value: this.depositValue,
        description: this.eventDetail.title
      }
      this.depositWalletForSafeBox(deposit)
      this.depositModal = false
      this.depositValue = ''
    },
    shareEvent () {
      if (navigator.share === undefined) {
        this.modalShare = true
        this.share = `Olá, você estar sendo convidado para o evento,\n${this.eventDetail.title}!\n Segue o link!\n ${window.location.href}`
      } else {
        this.$q.loading.show()
        const title = 'Olá!'
        const text = 'Temos o prazer de convidalo para este evento!'
        const url = `${window.location.href}`
        navigator.share({ title, text, url }).then(() => {
          this.$q.loading.hide()
        }).catch(e => {
          this.$q.loading.hide()
        })
      }
      this.$q.loading.hide()
    },
    copy () {
      navigator.clipboard.writeText(this.share).then(() => {
        this.modalShare = false
        console.log('Copiado com sucesso!')
      }).catch(e => {
        console.log('Não foi possivel copiar!')
      })
    },
    openModalSendInvitations () {
      this.sponsorsModal = false
      this.guestsModal = false
      this.sendInvitationModal = true
    },
    openModalRequestInvitation () {
      this.requestInvitationModal = true
    },
    sendRequestInvitation () {
      const requestInvitation = {
        id_requester: this.currentUser.id,
        id_organizer: this.eventDetail.id_organizer,
        id_event: this.eventDetail.id,
        type: this.typeRequeInvitation
      }
      this.resquestInvitation(requestInvitation)
      this.requestInvitationModal = false
    },
    sendInvit (idReceiver) {
      const invitation = {
        id_receiver: idReceiver,
        id_sender: this.currentUser.id,
        id_event: this.eventDetail.id,
        type: this.typeInvitation
      }

      this.sendInvitation(invitation)
      this.sendInvitationModal = false
    }
  },
  mounted () {
    this.eventClear()
    this.getEventById(this.id)
  }
}
</script>

<style lang="stylus" scoped>
  .buttons{
     width 240px
     margin 5px
  }
  @media (max-width: 768px) {
    .buttons{
    width 100%
    margin 5px
    }
  }
</style>
