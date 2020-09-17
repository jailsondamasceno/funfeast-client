<template>
   <q-page class="container q-pa-md">
   <div class="col-xs-12 col-sm-12 col-md-5 col-lg-3 col-xl-3">
         <q-select @input="searchServicesFilter()" style="padding-bottom: 20px;" rounded outlined v-model="filter.category" :options="categoryProviders" label="Categtoria" />
    </div>
    <div class="row q-gutter-md justify-center">
      <div
        class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3"
        v-for="service in services"
        :key="service.id"
      >
        <q-card class="services">
            <div class="row q-gutter-md justify-center">
                <q-avatar>
                   <q-icon style="font-size: 2em;" name="pages" />
                 </q-avatar>
            </div>
            <div>
             <q-item>
              <q-item-section>
                <div class="text-h6">{{service.title}}</div>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name="notes"/>
              </q-item-section>
              <q-item-section>
                <div class="text-subtitle2">{{service.short_description}}</div>
                <q-item-label caption>Descrição</q-item-label>
              </q-item-section>
            </q-item>
            <q-item  v-if="service.linkVideo !==''">
              <q-item-section>
                 <q-video :src="service.linkVideo"/>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name="monetization_on"/>
              </q-item-section>
              <q-item-section>
                <div class="text-subtitle2">{{`R$ ${service.value}`}}</div>
                <q-item-label caption>valor</q-item-label>
              </q-item-section>
            </q-item>
            <q-item >
              <q-item-section avatar>
                <q-icon v-if="service.status ==='ATIVO'" color="green" name="check"/>
                <q-icon v-else color="red" name="close"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{service.status}}</q-item-label>
                <q-item-label caption>status</q-item-label>
              </q-item-section>
            </q-item>
            <q-card-actions class="row q-pa-md justify-center">
              <q-btn class="shadow-15" style="margin: 10px;" rounded color="white"  text-color="primary" @click="showServiceDetail(service)" label="Ver mais" />
            </q-card-actions>
            </div>
          </q-card>
        </div>
        </div>
        <div v-if="showLoadMore" class="row q-pa-md justify-center">
          <q-btn @click="searchServices()" class="shadow-15" style="margin: 10px;" rounded color="white"  text-color="primary" label="Carregar Mais" />
        </div>
        <AddService v-on:addserviceevent="fechaModalService()" :modalAdd="modalAddService"/>

        <q-dialog
      v-model="modalShowService"
    >
      <q-card class="service">
            <div class="row q-gutter-md justify-center">
                <div class="text-h6">{{serviceDetail.title}}</div>
            </div>
            <div>
            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name="notes"/>
              </q-item-section>
              <q-item-section>
                <div class="text-subtitle2">{{serviceDetail.description}}</div>
                <q-item-label caption>Descrição</q-item-label>
              </q-item-section>
            </q-item>
            <q-item  v-if="serviceDetail.linkVideo">
              <q-item-section>
                 <q-video class="video_modal" :src="serviceDetail.linkVideo"/>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name="monetization_on"/>
              </q-item-section>
              <q-item-section>
                <div class="text-subtitle2">{{`R$ ${serviceDetail.value}`}}</div>
                <q-item-label caption>valor</q-item-label>
              </q-item-section>
            </q-item>
            <q-item >
              <q-item-section avatar>
                <q-icon v-if="serviceDetail.status ==='ATIVO'" color="green" name="check"/>
                <q-icon v-else color="red" name="close"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{serviceDetail.status}}</q-item-label>
                <q-item-label caption>status</q-item-label>
              </q-item-section>
            </q-item>
            <q-card-actions class="row q-gutter-md q-pa-md justify-center">
            <!--  <q-btn @click="modalShowService = false"   class="shadow-15 buttons"  rounded color="white" text-color="primary" label="Ver mais servicos deste usuário"/> -->
             <q-btn @click="buyService()"   class="shadow-15 buttons"  rounded color="white" text-color="primary" label="Contratar"/>
             <q-btn @click="modalShowService = false"   class="shadow-15 buttons"  rounded color="white" text-color="secondary" label="Fechar"/>
            </q-card-actions>
            </div>
          </q-card>
        </q-dialog>
        <q-dialog  v-model="modalByService">
          <q-card>
             <q-card-section>
           <div class="row q-gutter-md justify-center">
                <q-avatar>
                   <q-icon style="font-size: 2em;" name="notifications_none" />
                 </q-avatar>
            </div>
        </q-card-section>
        <q-card-section>
            <span>Ao fazer o pedido, ele será encaminhado ao prestador.<br>Caso o pedido seja recusado o valor voltará para o cofre!</span>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section style="max-height: 50vh" class="scroll">
          <div class="q-pa-md" v-for="event in eventsCreatedForMe" :key="event.id">
        <q-list link>
          <q-item tag="label" v-ripple style="border-radius: 5px;"  class="shadow-15">
            <q-item-section avatar>
              <q-radio v-model="eventSelected" :val="event.id" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{event.title}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
          </div>
            </q-card-section>
        <q-card-actions class="row q-gutter-md q-pa-md justify-center">
            <q-btn @click="sendByServi()"   class="shadow-15 buttons"  rounded color="white" text-color="primary" label="Finalizar"/>
             <q-btn @click="modalByService = false"   class="shadow-15 buttons"  rounded color="white" text-color="secondary" label="Cancelar"/>
        </q-card-actions>
          </q-card>
        </q-dialog>
     </q-page>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import AddService from './AddService'
export default {
  name: 'SearchServices',
  components: { AddService },
  data () {
    return {
      modalAddService: false,
      modalShowService: false,
      modalByService: false,
      serviceDetail: {},
      eventSelected: '',
      annotationBuy: '',
      filter: {}
    }
  },
  computed: {
    ...mapState('servicos', ['services', 'lastService', 'loadMore', 'lastCategory']),
    ...mapState('eventos', ['eventsCreatedForMe']),
    ...mapState('usuarios', ['currentUser', 'categoryProviders']),
    showLoadMore () {
      if (this.loadMore === true) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapActions('servicos', ['getServices', 'SendBuyService', 'clearServices', 'SendBuyService']),
    ...mapActions('eventos', ['eventsByOrganizer']),
    ...mapActions('usuarios', ['getCategoryProvidersNoLoad']),
    fechaModalService () {
      this.modalAddService = false
    },
    searchServicesFilter () {
      this.clearServices()
      this.searchServices()
    },
    searchServices () {
      this.filter.category = this.filter.category ? this.filter.category.value : this.filter.category = ''
      this.filter.country = this.currentUser.country
      this.filter.state = this.currentUser.state
      this.filter.city = this.currentUser.city
      this.filter.last = this.lastService
      this.getServices(this.filter)
    },
    showServiceDetail (service) {
      this.serviceDetail = service
      this.modalShowService = true
    },

    buyService () {
      this.modalShowService = false
      this.eventsByOrganizer(this.currentUser.id)
      this.modalByService = true
    },

    sendByServi () {
      var buy = {
        id_contractor: this.currentUser.id,
        id_event: this.eventSelected,
        id_service_provider: this.serviceDetail.id_service_provider,
        id_service: this.serviceDetail.id,
        title: this.serviceDetail.title,
        description: this.serviceDetail.description,
        value: this.serviceDetail.value,
        annotation: this.annotationBuy
      }
      this.SendBuyService(buy)
      this.modalByService = false
    },

    getMyEvents () {
      this.eventsByOrganizer(this.currentUser.id)
    }
  },
  mounted () {
    this.clearServices()
    this.getCategoryProvidersNoLoad()
    this.searchServices()
  }
}
</script>
<style  lang="stylus" scoped>
  .services{
    padding 5px
  }
  .service{
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
