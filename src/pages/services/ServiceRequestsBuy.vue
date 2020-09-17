<template>
     <q-page class="container q-pa-md">
         <div class="col-xs-12 col-sm-12 col-md-5 col-lg-3 col-xl-3">
         <q-select @input="myRequests()" style="padding-bottom: 20px;" rounded outlined v-model="filter.status" :options="status" label="STATUS" />
       </div>

          <div class="but">
             <q-checkbox v-model="searchForDate"  label="Filtrar por data"/>
            <q-btn v-if="searchForDate==true" class="shadow-15" style="margin: 10px;" rounded color="white"  text-color="primary" @click="myRequests()" label="Buscar" />
          </div>

          <div class="dates" v-if="searchForDate==true">
         <div class="date">
          <q-input rounded outlined v-model="filter.date_start" label="Data Incio">
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy  ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date v-model="filter.date_start" mask="DD-MM-YYYY"   @input="() => $refs.qDateProxy.hide()"/>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
        </div>

         <div class="date" >
          <q-input rounded outlined v-model="filter.date_end" label="Data Fim">
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy  ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date v-model="filter.date_end" mask="DD-MM-YYYY"  @input="() => $refs.qDateProxy.hide()"/>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
        </div>
          </div>

        <div class="scroll">
        <div class="row q-gutter-md justify-center">
        <div v-for="request in myRequestServices"
        :key="request.id">
          <q-card style="width:300px; padding: 10px; margin: 20px; border-radius: 10px;">
            <div class="row q-gutter-md justify-center">
                <q-avatar>
                   <q-icon style="font-size: 2em;" name="shopping_cart" />
                 </q-avatar>
            </div>
            <div>
             <q-item>
              <q-item-section style="lign-self:center;">
                <div class="text-h6">{{request.title}}</div>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name="notes"/>
              </q-item-section>
              <q-item-section>
                <div class="text-subtitle2">{{request.short_description}}</div>
                <q-item-label caption>Descrição</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name="how_to_reg"/>
              </q-item-section>
              <q-item-section>
                <div class="text-subtitle2">{{request.contractor_name}}</div>
                <q-item-label caption>Comprador</q-item-label>
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
            <q-card-actions class="row q-pa-md justify-center">
              <q-btn @click="showBuyDatail(request)"   class="shadow-15" style="margin: 10px;" rounded color="white" text-color="primary" label="Detalhes"/>
              <q-btn v-if="request.status == 'AGUARDANDO CONFIRMAÇÃO'" @click="responseBuy('ACCEPT', request)" class="shadow-15" style="margin: 10px;" rounded color="white"  text-color="primary"  label="Confirmar" />
              <q-btn  v-if="request.status == 'AGUARDANDO CONFIRMAÇÃO'" @click="responseBuy('REJECT', request)" class="shadow-15" style="margin: 10px;" rounded color="white"  text-color="secondary"  label="Recusar" />
            </q-card-actions>
            </div>
          </q-card>
        </div>
        </div>
        </div>
        <q-dialog  v-model="modalReject">
          <q-card>
             <q-card-section>
           <div class="row q-gutter-md justify-center">
                <q-avatar>
                   <q-icon style="font-size: 2em;" name="notifications_none" />
                 </q-avatar>
            </div>
        </q-card-section>
        <q-card-section>
            <span>Por favor forneça um motivo pelo qual está recusando este pedido!</span>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section>
         <div class="col-xs-12 col-sm-12 col-md-5 col-lg-3 col-xl-3">
             <q-input
            rounded
            outlined
            type = 'textarea'
            v-model="note"
            label="Anotação"
            lazy-rules
            :rules="[ val => val && val.length > 20 || 'Não pode está vazio!']"
          />
         </div>
            </q-card-section>
        <q-card-actions class="row q-gutter-md q-pa-md justify-center">
            <q-btn @click="rejectBuy()"   class="shadow-15 buttons"  rounded color="white" text-color="primary" label="Rejeitar"/>
             <q-btn @click="modalReject = false"  class="shadow-15 buttons"  rounded color="white" text-color="secondary" label="Fechar"/>
        </q-card-actions>
          </q-card>
        </q-dialog>

             <q-dialog
      v-model="modalBuyDetail"
    >
      <q-card class="buy-datail">
            <div class="row q-gutter-md justify-center">
                <div class="text-h6">{{buyDetail.title}}</div>
            </div>
            <div>
             <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name="notes"/>
              </q-item-section>
              <q-item-section>
                <div class="text-subtitle2">{{buyDetail.description}}</div>
                <q-item-label caption>Descrição</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name="how_to_reg"/>
              </q-item-section>
              <q-item-section>
                <div class="text-subtitle2">{{buyDetail.contractor_name}}</div>
                <q-item-label caption>Comprador</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name=""/>
              </q-item-section>
              <q-item-section>
                <div class="text-subtitle2">{{buyDetail.event_title}}</div>
                <q-item-label caption>evento</q-item-label>
              </q-item-section>
            </q-item>
              <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name="event"/>
              </q-item-section>
              <q-item-section>
                <div class="text-subtitle2">{{formatDate}}</div>
                <q-item-label caption>data evento</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name="alarm_on"/>
              </q-item-section>
              <q-item-section>
                <div class="text-subtitle2">{{buyDetail.event_hour}}</div>
                <q-item-label caption>hora evento</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name=""/>
              </q-item-section>
              <q-item-section>
                <div class="text-subtitle2">{{buyDetail.event_country}}</div>
                <q-item-label caption>Pais</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name=""/>
              </q-item-section>
              <q-item-section>
                <div class="text-subtitle2">{{buyDetail.event_state}}</div>
                <q-item-label caption>estado</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name=""/>
              </q-item-section>
              <q-item-section>
                <div class="text-subtitle2">{{buyDetail.event_city}}</div>
                <q-item-label caption>cidade</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-if="buyDetail.annotation">
              <q-item-section avatar>
                <q-icon color="primary" name="notification_important"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{buyDetail.annotation}}</q-item-label>
                <q-item-label caption>Anotação</q-item-label>
              </q-item-section>
            </q-item>
            <q-card-actions class="row q-gutter-md q-pa-md justify-center">
             <q-btn @click="modalBuyDetail = false"   class="shadow-15 buttons"  rounded color="white" text-color="primary" label="Fechar"/>
            </q-card-actions>
            </div>
          </q-card>
        </q-dialog>

     </q-page>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ServiceRequestBuy',
  computed: {
    ...mapState('servicos', ['myRequestServices']),
    ...mapState('usuarios', ['currentUser']),
    formatDate () {
      var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      var date = new Date(this.buyDetail.event_date)
      return date.toLocaleString('pt-BR', options)
    }
  },
  data () {
    return {
      searchForDate: '',
      modalReject: false,
      modalBuyDetail: false,
      buyDetail: {},
      buySelected: {},
      note: '',
      filter: {
      },
      status: [
        { value: 'AGUARDANDO CONFIRMAÇÃO', label: 'AGUARDANDO CONFIRMAÇÃO' },
        { value: 'CONFIRMADO', label: 'CONFIRMADO' },
        { value: 'RECUSADO', label: 'RECUSADO' },
        { value: 'CANCELADO', label: 'CANCELADO' }
      ]
    }
  },
  methods: {
    ...mapActions('servicos', ['servicesRequestsByProviders', 'confirmOrRejectBuy']),
    myRequests () {
      this.filter.id_service_provider = this.currentUser.id
      this.filter.status = this.filter.status ? this.filter.status.value : ''
      this.servicesRequestsByProviders(this.filter)
    },
    responseBuy (type, buy) {
      buy.resp = type
      this.buySelected = buy
      if (type === 'REJECT') {
        this.modalReject = true
        return
      }
      this.confirmOrRejectBuy(this.buySelected)
      this.modalReject = false
      this.buySelected = {}
    },
    rejectBuy () {
      if (this.note.length < 20) {
        this.$q.notify({ type: 'warning',
          timeout: 2000,
          color: 'red',
          message: 'Quantidade de caracteres insuficiente!',
          position: 'top' })
      } else {
        this.buySelected.annotate = this.note
        this.confirmOrRejectBuy(this.buySelected)
        this.modalReject = false
        this.buySelected = {}
      }
    },
    showBuyDatail (buy) {
      this.buyDetail = buy
      this.modalBuyDetail = true
    }
  },
  mounted () {
    this.myRequests()
  }
}
</script>
<style lang="stylus" scoped>
     .dates{
          display flex
          flex-direction row
          flex-wrap wrap
          justify-content space-around
          align-items center
          padding 10px
     }
      .date{
     width  50%
     padding 5px
  }
   @media (max-width: 768px) {
    .date{
    width 100%
    }
  }

  .buy-datail{
    padding 5px
    width fit-content
    display flex
    flex-direction column
    justify-content center
    align-items center
  }
   .buttons{
     width fit-content;
     margin 5px
  }
   @media (max-width: 768px) {
    .buttons{
    width 100%
    margin 5px
    }
  }
</style>
