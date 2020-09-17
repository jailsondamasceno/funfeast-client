<template>
  <q-page class="container q-pa-md">
    <div>
    <q-list bordered class="rounded-borders">
      <q-expansion-item
        expand-separator
        icon="perm_identity"
        label="Informações da conta"
        :caption="user.name"
      >
        <q-card>
          <q-card-section>
            <div class="row q-pa-md justify-start">
                <q-item @click="editImageModal = true" clickable v-ripple>
                <q-item-section side>
                  <q-avatar rounded size="48px">
<!--                     <img src="https://cdn.quasar.dev/img/avatar.png" /> -->
                 <q-icon style="font-size: 2em;" name="account_circle" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Alterar foto de perfil</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <q-card-section>
          <div class="row q-pa-md  q-gutter-md justify-start">

         <div class="col-xs-12 col-sm-12 col-md-5 col-lg-3 col-xl-3">
            <q-input
            :disable='disable'
            rounded
            outlined
            type = 'text'
            v-model="user.name"
            label="Nome"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'None não pode ser vazio']"
          />
        </div>
         <div class="col-xs-12 col-sm-12 col-md-5 col-lg-3 col-xl-3">
            <q-input
            :disable='disable'
            rounded
            outlined
            type = 'text'
            v-model="user.lastName"
            label="Sobrenome"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Sobrenome não pode ser vazio']"
          />
        </div>

         <div class="col-xs-12 col-sm-12 col-md-5 col-lg-3 col-xl-3">
           <q-select @focus="searchStates()"  @input="getStates(user.country)" style="padding-bottom: 20px;"  :disable='disable' rounded outlined v-model="user.country" :options="countrys" label="País" />
         </div>

         <div class="col-xs-12 col-sm-12 col-md-5 col-lg-3 col-xl-3">
           <q-select @focus="getCitys(user)"  @input="searchCitys()" style="padding-bottom: 20px;"  :disable='disable' rounded outlined v-model="user.state" :options="states" label="Estado" />
         </div>

         <div class="col-xs-12 col-sm-12 col-md-5 col-lg-3 col-xl-3">
           <q-select style="padding-bottom: 20px;"  :disable='disable' rounded outlined v-model="user.city" :options="citys" label="Cidade" />
         </div>

         <div class="col-xs-12 col-sm-12 col-md-5 col-lg-3 col-xl-3">
            <q-input
            :disable='disable'
            rounded
            outlined
            type = 'text'
            v-model="user.street"
            label="Logradouro, 0"
          />
        </div>
          </div>
        </q-card-section>
           <div class="row q-p-md justify-center  items-center" style="padding: 20px;">
      <q-btn style="margin:10px;" class="shadow-15 buttons" rounded color="white" icon="edit"  text-color="secondary" @click="disable = false" label="Editar" />
      <q-btn style="margin:10px;" class="shadow-15 buttons" rounded color="white" icon="settings_backup_restore"  text-color="#000" @click="disable = true" label="Voltar" />
      <q-btn style="margin:10px;" class="shadow-15 buttons" rounded color="white" icon="done"  text-color="primary" @click="editUser(user)" label="Salvar" />
        </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        expand-separator
        icon="lock"
        label="Alterar senha"
      >
        <q-card>
          <p style="padding:10px;">Necessário ter logado recentemente!</p>
          <q-card-section>
          <div class="row q-pa-md  q-gutter-md justify-start">

         <div class="col-xs-12 col-sm-12 col-md-5 col-lg-3 col-xl-3">
            <q-input
            rounded
            outlined
            type = 'password'
            v-model="password"
            label="Nova Senha"
            lazy-rules
          />
        </div>
         <div class="col-xs-12 col-sm-12 col-md-5 col-lg-3 col-xl-3">
            <q-input
            rounded
            outlined
            type = 'password'
            v-model="passwordRepeat"
            label="Repita nova senha"
            lazy-rules
            :rules="[ val => val && val == password || 'Senhas não conferem']"
          />
        </div>
          </div>
            <div class="row q-p-md justify-center  items-center" style="padding: 20px;">
              <q-btn style="margin:10px;" class="shadow-15 buttons" rounded color="white" icon="done"  text-color="primary" @click="updatePassword(password)" label="Salvar" />
        </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item icon="assessment" label="Disabled" disable>
        <q-card>
          <q-card-section>
            Teste
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
    <q-dialog  v-model="editImageModal">
      <q-card>
      </q-card>
    <div class="q-gutter-sm row items-start">
      <q-uploader
        url="http://localhost:4444/upload"
        style="max-width: 300px"
      />
      </div>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Config',
  data () {
    return {
      userModal: false,
      editImageModal: false,
      user: {},
      disable: true,
      oldPassword: '',
      password: '',
      passwordRepeat: ''
    }
  },
  computed: {
    ...mapState('eventos', ['events', 'countrys', 'states', 'citys']),
    ...mapState('usuarios', ['currentUser'])
  },
  methods: {
    ...mapActions('eventos', ['getCountrys', 'getStates', 'getCitys']),
    ...mapActions('usuarios', ['editUser', 'updatePassword']),
    setUser () {
      var usr = JSON.parse(localStorage.getItem('currentUser'))
      this.user = usr
      this.user.country = { label: usr.country_name, value: usr.country }
      this.user.state = { label: usr.state_name, value: usr.state }
      this.user.city = { label: usr.city_name, value: usr.city }
    },
    openModalUser () {
      this.userEdit = this.user
      this.userModal = true
    },
    searchStates () {
      this.clearStates()
      this.clearCitys()
      this.getStates(this.user.country)
    },
    searchCitys () {
      this.clearCitys()
      this.getCitys(this.user)
    },
    clearStates () {
      delete this.user.state
    },
    clearCitys () {
      delete this.user.city
    }
  }, // fim de métodos
  mounted () {
    this.setUser()
    this.getCountrys()
  }
}
</script>

<style lang="stylus" scoped>
 .buttons{
     width 240px
     margin 5px
  }
  @media (max-width: 600px) {
    .buttons{
    width 100%
    margin 5px
    }
  }
</style>
