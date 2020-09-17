<template>
   <q-page class="container q-pa-md">
    <div class="row q-p-md justify-end" style="padding-bottom: 20px;">
      <q-btn class="shadow-15" style="margin: 10px;" rounded color="white" icon="add"  text-color="primary" @click="modalAddService = true" label="Adicionar serviço" />
    </div>
    <div class="row q-gutter-md justify-center">
      <div
        class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3"
        v-for="service in myServices"
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
                <div class="text-subtitle2">{{service.description}}</div>
                <q-item-label caption>Descrição</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section avatar>
                <q-icon color="primary" name="ondemand_video"/>
              </q-item-section>
              <q-item-section>
                <div class="text-subtitle2">Ver vídeo</div>
                 <q-video src="https://www.youtube.com/embed/o2QQWcLE7ac"/>
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
              <q-btn class="shadow-15" style="margin: 10px;" rounded color="white" icon="remove_red_eye"  text-color="primary" @click="true" label="" />
              <q-btn class="shadow-15" style="margin: 10px;" rounded color="white" icon="edit"  text-color="primary" @click="true" label="" />
            </q-card-actions>
            </div>
          </q-card>
        </div>
        </div>
        <AddService v-on:addserviceevent="fechaModalService()" :modalAdd="modalAddService"/>
     </q-page>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import AddService from './AddService'
export default {
  name: 'MyServices',
  components: { AddService },
  data () {
    return {
      modalAddService: false
    }
  },
  computed: {
    ...mapState('servicos', ['myServices']),
    ...mapState('usuarios', ['currentUser'])
  },
  methods: {
    ...mapActions('servicos', ['servicesByProvider']),
    ...mapActions('usuarios', ['getCategoryProviders']),
    fechaModalService () {
      this.modalAddService = false
    }
  },
  mounted () {
    this.getCategoryProviders()
    this.servicesByProvider(this.currentUser.id)
  }
}
</script>
<style scoped>
</style>
