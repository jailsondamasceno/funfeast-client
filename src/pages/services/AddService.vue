<template>
<q-page class="container q-pa-md">
<q-dialog
      v-model="modalAdd"
      full-width
    >
      <q-card>
        <q-card-section>
          <div class="text-h6">ADICIONAR UM SERVIÇO</div>
        </q-card-section>

        <q-card-section>
          <div :class="`row q-pa-md  q-gutter-md justify-start`">

          <div class="col-xs-12 col-sm-12 col-md-5 col-lg-3 col-xl-3">
         <q-select style="padding-bottom: 20px;" rounded outlined v-model="service.category" :options="categoryProviders" label="Categtoria" />
        </div>

         <div class="col-xs-12 col-sm-12 col-md-5 col-lg-3 col-xl-3">
            <q-input
            rounded
            outlined
            type = 'text'
            v-model="service.title"
            label="Titulo"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
        </div>

        <div class="col-xs-12 col-sm-12 col-md-5 col-lg-3 col-xl-3">
          <q-input
            rounded
            outlined
            type = 'textarea'
            v-model="service.description"
            label="Descrição"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
        </div>

         <div class="col-xs-12 col-sm-12 col-md-5 col-lg-3 col-xl-3">
            <q-input
            rounded
            outlined
            type = 'number'
            v-model="service.value"
            label="Valor"
          />

        </div>
        <div class="col-xs-12 col-sm-12 col-md-5 col-lg-3 col-xl-3">
            <q-input
            rounded
            outlined
            type = 'url'
            v-model="service.linkVideo"
            label="Link de um vídeo do youtube"
          />
          </div>
          <div class="col-xs-12 col-sm-12 col-md-5 col-lg-3 col-xl-3">
         <q-select style="padding-bottom: 20px;" rounded outlined v-model="service.status" :options="status" label="Status" />
        </div>

          </div>
        </q-card-section>

       <div class="row q-pa-md justify-end">
        <q-card-actions>
         <q-btn @click="sendService()"  class="shadow-15" rounded color="white" text-color="primary" label="Cadastrar"/>
         <q-btn @click="emitEventCloseModal()"  class="shadow-15" label="Fechar"  rounded color="white" text-color="secondary"/>
        </q-card-actions>
        </div>
      </q-card>
    </q-dialog>
</q-page>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AddService',
  props: ['modalAdd'],
  computed: {
    ...mapState('usuarios', ['categoryProviders', 'currentUser'])
  },
  data () {
    return {
      modalService: false,
      service: {},
      status: [
        { value: 'ATIVO', label: 'ATIVO' },
        { value: 'INATIVO', label: 'INATIVO' }
      ]
    }
  },
  methods: {
    ...mapActions('servicos', ['addService']),
    sendService () {
      this.service.id_category = this.service.category.value
      this.service.id_service_provider = this.currentUser.id
      this.service.status = this.service.status.value
      this.addService(this.service)
      this.emitEventCloseModal()
      this.service = {}
    },
    emitEventCloseModal () {
      this.$emit('addserviceevent')
    },
    mounted () {
    }
  }
}
</script>
<style scoped>

</style>
