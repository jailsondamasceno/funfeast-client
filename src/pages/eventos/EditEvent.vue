<template>
  <q-page class="container q-pa-md">
            <q-dialog
      v-model="modalEditEvent"
    >
      <q-card>
        <q-card-section>
          <div class="text-h6">Editar Evento</div>
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
  </q-page>
  </template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'EditEvent',
  props: ['event_update', 'modalEditEvent'],
  data () {
    return {
      event: {}
    }
  },
  computed: {
    ...mapState('eventos')
  },
  methods: {
    ...mapActions(['eventos']),
    setEvent () {
      this.event = this.event_update
      this.event.category = { label: this.event_update.category_name, value: this.event_update.category }
      this.country = { label: this.event.country, value: this.event_update.country }
      this.state = { label: this.event.state, value: this.event_update.state }
      this.city = { label: this.event.city, value: this.event_update.city }
      var date = new Date(parseInt(this.event_update.date))
      this.event.date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }
  }

}
</script>
