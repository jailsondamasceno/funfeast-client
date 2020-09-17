<template>
  <q-page class="container q-pa-md">
     <div class="row q-p-md justify-center  items-center" style="padding: 20px;">
       <q-card style="width: 700px; max-width: 80vw;" v-if="guestDetail.clear == false">
       <div class="q-pa-md">
          <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>
        <q-item-section>{{`${guestDetail.name} ${guestDetail.lastName}`}}</q-item-section>
      </q-item>
          <q-item>
        <q-item-section>
           <q-item-label>{{guestDetail.country_name}}</q-item-label>
           <q-item-label caption>País</q-item-label>
        </q-item-section>
      </q-item>
          <q-item>
        <q-item-section>
           <q-item-label>{{guestDetail.state_name}}</q-item-label>
           <q-item-label caption>Estado</q-item-label>
        </q-item-section>
      </q-item>
          <q-item>
        <q-item-section>
           <q-item-label>{{guestDetail.city_name}}</q-item-label>
           <q-item-label caption>Cidade</q-item-label>
        </q-item-section>
      </q-item>
       </div>
       </q-card>
     </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'guestDetail',
  data () {
    return {
      idGuest: this.$route.params.idGuest
    }
  },
  computed: {
    ...mapState('eventos', ['guestDetail'])
  },
  methods: {
    ...mapActions('eventos', ['getGuest'])
  },
  mounted () {
    this.getGuest(this.idGuest)
  }
}
</script>

<style lang="stylus" scoped>
/*   .buttons{
     width 240px
     margin 5px
  }
  @media (max-width: 600px) {
    .buttons{
    width 100%
    margin 5px
    }
  } */
</style>
