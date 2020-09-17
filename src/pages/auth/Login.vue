<template>
  <q-page class="container q-pa-md">
    <div class="row q-pa-md q-gutter-md justify-center">
      <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
        <q-dialog noBackdropDismiss v-model="card">
      <q-card style="width: 300px; max-width: 80vw;">
         <div class="col content-center items-center">
            <div class="row q-pa-md justify-center">
              <q-avatar>
                 <q-icon style="font-size: 2em;" name="lock" />
              </q-avatar>
            </div>
        <q-card-section>
           <q-input
            rounded
            outlined
            v-model="dadosUsuario.email"
            label="Seu e-mail"
            hint="digite um e-mail válido"
            lazy-rules
          />
          <q-input
            rounded
            outlined
            type="password"
            v-model="dadosUsuario.senha"
            label="Sua senha"
            lazy-rules
          />
        </q-card-section>
        <div class="row q-pa-md justify-center">
        <q-card-actions>
           <q-btn @click="login(dadosUsuario)" label="Entrar" type="submit" color="primary"/>
           <q-btn @click="createAccount()" label="Criar conta" type="submit" color="secondary"/>
        </q-card-actions>
        </div>
         </div>
      </q-card>
    </q-dialog>
         <!--  <q-input
            rounded
            outlined
            v-model="dadosUsuario.email"
            label="Seu e-mail"
            hint="digite um e-mail válido"
            lazy-rules
          />
          <q-input
            rounded
            outlined
            type="password"
            v-model="dadosUsuario.senha"
            label="Sua senha"
            lazy-rules
          />
          <div class="q-pa-md">
        <q-btn @click="login(dadosUsuario)" label="Entrar" type="submit" color="primary"/>
        </div> -->
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      card: false,
      dadosUsuario: {}
    }
  },
  methods: {
    ...mapActions('usuarios', ['login', 'logout']),
    abrirModal () {
      this.card = true
    },
    createAccount () {
      this.$router.push('/signup')
    }
  },
  mounted () {
    this.logout()
    this.abrirModal()
  }
}
</script>
<style lang="stylus" scoped>
   .container{
    background url('../../assets/fest.jpg') no-repeat center center fixed
    background-size cover
    opacity: 0.6;
    }
</style>
