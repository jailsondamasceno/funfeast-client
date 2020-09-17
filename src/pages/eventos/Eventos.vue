<template>
  <q-page class="container q-pa-md">
    <div class="row q-p-md justify-around" style="padding-bottom: 20px;">
      <q-btn class="shadow-15 buttons" style="margin: 10px;" rounded color="white" icon="search" text-color="primary" @click="searchMyEvents()" label="Meus Eventos" />
      <q-btn class="shadow-15 buttons" style="margin: 10px;" rounded color="white" icon="settings_input_composite"  text-color="primary" @click="modalFilter = true" label="Filtrar eventos" />
      <q-btn class="shadow-15 buttons" style="margin: 10px;" rounded color="white" icon="add"  text-color="primary" @click="eventModal = true" label="Adicionar evento" />
    </div>
    <div class="row q-gutter-md justify-center">
      <div
        class="col-xs-12 col-sm-12 col-md-3 col-lg-2 col-xl-2"
        v-for="event in events"
        :key="event.id"
      >
        <q-card class="my-card">
          <img v-if="event.url_image" :src="event.url_image">
          <img v-else src="../../assets/image_event_default.png">
          <q-card-actions align="around">
            <q-chip outline color="secondary" text-color="white" icon-right="favorite">{{event.likes}}</q-chip>
            <q-btn  rounded color="white"  text-color="primary" label="Ver"  @click="eventDetail(event.id)"/>
            <q-btn  rounded color="white"  text-color="primary" icon="edit"  @click="eventDetail(event.id)"/>
            <q-btn outline round color="primary" icon="share"  @click="shareEvent(event)"/>
          </q-card-actions>

          <q-list>
            <q-item>
              <q-item-section>
                <div class="text-h6">{{event.title}}</div>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name="perm_identity"/>
              </q-item-section>
              <q-item-section>
                <div class="text-subtitle2">{{event.organizer}}</div>
                <q-item-label caption>Organizador</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name="today"/>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{event.date_formated}}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item >
              <q-item-section avatar>
                <q-icon color="primary" name="access_time"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{event.hour}}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon color="red" name="place"/>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{event.city_name}}</q-item-label>
                <q-item-label caption>cidade</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>
     <div  v-if="loadMoreEvents" class="row q-pa-md justify-center">
              <q-btn  @click="searchEvents()" class="shadow-15" style="margin: 10px;" rounded color="white"  text-color="primary" label="Carregar Mais" />
     </div>
    <div>
         <q-dialog
      v-model="eventModal"
    >
      <q-card>
        <q-card-section>
          <div class="text-h6">Crie seu evento</div>
        </q-card-section>

        <q-card-section>
          <div class="row wrap q-pa-md  q-gutter-md justify-center">

         <div class="col-12">
            <q-input
            rounded
            outlined
            type = 'text'
            v-model="event.title"
            label="Titulo"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
        </div>
         <div class="col-12">
         <q-select style="padding-bottom: 20px;" rounded outlined v-model="event.category" :options="categoryEvents" label="categoria" />
        </div>
         <div class="col-12">
         <q-select style="padding-bottom: 20px;" rounded outlined v-model="event.status" :options="status" label="status" />
        </div>

         <div class="col-12">
          <q-input rounded outlined v-model="event.date" label="Data">
      <template v-slot:prepend>
       <q-icon name="event" class="cursor-pointer">
       <q-popup-proxy  ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date v-model="event.date" mask="DD-MM-YYYY HH:mm"  @input="() => $refs.qDateProxy.hide()"/>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
        </div>

         <div class="col-12">
           <q-input rounded outlined v-model="event.hour" label="Hora">
      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy  ref="qHoureProxy" transition-show="scale" transition-hide="scale">
            <q-time v-model="event.hour" mask="HH:mm"  @input="() => $refs.qHoureProxy.hide()" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
        </div>

         <div class="col-12">
           <q-select style="padding-bottom: 20px;" rounded outlined v-model="event.public" :options="isPublic" label="Evento  é publico?" />
         </div>

         <div class="col-12">
           <q-select @input="getStates(event.country)" style="padding-bottom: 20px;" rounded outlined v-model="event.country" :options="countrys" label="País" />
         </div>

         <div class="col-12">
           <q-select @input="getCitys(event)" style="padding-bottom: 20px;" rounded outlined v-model="event.state" :options="states" label="Estado" />
         </div>

         <div class="col-12">
           <q-select style="padding-bottom: 20px;" rounded outlined v-model="event.city" :options="citys" label="Cidade" />
         </div>

         <div class="col-12">
            <q-input
            rounded
            outlined
            type = 'text'
            v-model="event.street"
            label="Logradouro, 0"
          />
        </div>

         <div class="col-12">
             <q-input
            rounded
            outlined
            type = 'textarea'
            v-model="event.description"
            label="Descrição"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
        </div>
          </div>
        </q-card-section>

       <div class="row q-pa-md justify-center">
        <q-card-actions>
         <q-btn @click="saveEvent" class="shadow-15" rounded label="Cadastrar" color="white" text-color="primary" />
         <q-btn @click="eventModal=false" class="shadow-15" rounded label="Fechar"  color="white" text-color="secondary"/>
        </q-card-actions>
        </div>
      </q-card>
    </q-dialog>

    </div>
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

   <q-dialog v-model="modalFilter" full-height>
     <q-card>
        <div class="q-pa-md q-gutter-lg">
          <div class="row">
            <div class="col-12">
               <q-select  disable style="padding-bottom: 20px;" rounded outlined v-model="country" :options="countrys" label="País" />
            </div>

            <div class="col-12">
               <q-select @input="searchCitys()" style="padding-bottom: 20px;" rounded outlined v-model="state" :options="states" label="Estado" />
            </div>

            <div class="col-12">
               <q-select  style="padding-bottom: 20px;" rounded outlined v-model="city" :options="citys" label="Cidade" />
            </div>
            <div class="col-12">
               <q-select style="padding-bottom: 20px;" rounded outlined v-model="category" :options="categoryEvents" label="Categoria" />
            </div>
            <div class="col-12">
               <q-select style="padding-bottom: 20px;" rounded outlined v-model="status_select" :options="status" label="Status" />
            </div>
        </div>
      </div>

      <div class="row q-p-md justify-center" style="padding-bottom: 20px;">
      <q-btn  @click="modalFilter = false" class="shadow-15 buttons" style="margin: 10px;" rounded color="white" icon="replay"  text-color="secondary" label="Cancelar" />
      <q-btn @click="searchEventsFilter()" class="shadow-15 buttons" style="margin: 10px;" rounded color="white" icon="search"  text-color="primary"  label="Buscar" />
      </div>

     </q-card>
   </q-dialog>
    <!-- <EditEvent :event_update="event_edit" :modalEditEvent="openModalEdit"></EditEvent> -->
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// import EditEvent from './EditEvent'
export default {
  // components: { EditEvent },
  name: 'Eventos',
  data () {
    return {
      event: {},
      event_edit: {},
      openModalEdit: false,
      eventModal: false,
      share: '',
      modalShare: false,
      modalFilter: false,
      category: {},
      status_select: '',
      filter: {},
      country: {},
      state: {},
      city: {},
      nota: 0,
      status: ['AGENDADO', 'CONFIRMADO', 'REALIZADO', 'CANCELADO'],
      isPublic: [ { label: 'SIM', value: true }, { label: 'NÂO', value: false } ]
    }
  },
  computed: {
    ...mapState('eventos',
      ['events',
        'countrys',
        'states',
        'citys',
        'categoryEvents',
        'loadMoreEvents',
        'lastEvent'
      ]),
    ...mapState('usuarios', ['currentUser']),
    showLoadMore () {
      if (this.loadMoreEvents === true) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapActions('eventos',
      ['getEvents',
        'addEvent',
        'getCountrys',
        'getStates',
        'getCitys',
        'getCategoryEvents',
        'clearEvents'
      ]),
    eventDetail (id) {
      this.$router.push(`eventoDetalhe/${id}`)
    },
    setInitialFilter () {
      this.country = { label: this.currentUser.country_name, value: this.currentUser.country }
      this.state = { label: this.currentUser.state_name, value: this.currentUser.state }
      this.city = { label: this.currentUser.city_name, value: this.currentUser.city }
    },
    saveEvent () {
      this.event.id_organizer = this.currentUser.id
      this.addEvent(this.event)
      this.eventModal = false
    },
    shareEvent (event) {
      if (navigator.share === undefined) {
        this.modalShare = true
        this.share = `Olá, você estar sendo convidado para o evento,\n${event.title}!\n Segue o link!\n http://localhost:8080/eventoDetalhe/${event.id}`
      } else {
        this.$q.loading.show()
        const title = 'Olá!'
        const text = 'Temos o prazer de convidalo para este evento!'
        const url = `http://localhost:8080/eventoDetalhe/${event.id}`
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
    searchCitys () {
      var params = {}
      params.country = this.country
      params.state = this.state
      params.city = this.city
      this.city = {}
      this.getCitys(params)
    },
    searchMyEvents () {
    },
    searchEventsFilter () {
      this.clearEvents()
      this.searchEvents()
      this.modalFilter = false
    },
    searchEvents () {
      this.filter.country = this.country.value
      this.filter.state = this.state.value
      this.filter.city = this.city.value
      this.filter.category = this.category || ''
      this.filter.status = this.status_select || ''
      this.filter.last = this.lastEvent.date || ''
      this.getEvents(this.filter)
    }
  }, // fim methods
  mounted () {
    this.clearEvents()
    this.getCountrys()
    this.getCategoryEvents()
    this.setInitialFilter()
    this.getStates(this.country)
    this.searchEvents()
  }
}
</script>

<style lang="stylus" scoped>
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
