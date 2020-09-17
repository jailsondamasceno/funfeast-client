<template>
  <q-page class="col q-pa-md content-center">
        <q-dialog noBackdropDismiss v-model="card">
      <q-card style="width: 300px; max-width: 80vw;">
        <div class="row q-pa-md justify-center">
          <q-avatar>
            <q-icon style="font-size: 2em;" name="account_circle" />
             <!-- <img src="https://cdn.quasar.dev/img/avatar.png"> -->
           </q-avatar>
        </div>
        <q-card-section>
          <q-select style="padding-bottom: 20px;" @input="getCategories()" rounded outlined v-model="userData.profile" :options="profiles" label="Perfil" />
          <q-select v-if="userData.profile.value === 'PROVIDER'" style="padding-bottom: 20px;" rounded outlined v-model="userData.category" :options="categoryProviders" label="Categoria" />
          <q-select v-if="userData.profile.value === 'PROVIDER'" style="padding-bottom: 20px;" rounded outlined v-model="userData.typeProvider" :options="typeProviders" label="Tipo" />
          <q-input
            v-if="userData.typeProvider.value === 'ENTITY'"
            rounded
            outlined
            v-model="userData.cnpj"
            label="CNPJ"
            mask="##.###.###/####-##"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'CNPJ não pode está vazio !']"
          />
          <q-input
            v-if="userData.typeProvider.value === 'ENTITY'"
            rounded
            outlined
            v-model="userData.company_name"
            label="Nome Fantasia"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'CNPJ não pode está vazio !']"
          />
          <q-input
            rounded
            outlined
            v-model="userData.name"
            label="Nome"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Nome não pode está vazio !']"
          />
          <q-input
            rounded
            outlined
            v-model="userData.lastName"
            label="Sobrenome"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Sobrenome não pode está vazio !']"
          />
          <q-select style="padding-bottom: 20px;" rounded outlined v-model="userData.codeCellphone" :options="codesCellphone" label="Código do País" />
          <q-input
            rounded
            outlined
            type="number"
            v-model="userData.cellphone"
            label="DDD + Telefone"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Telefone inválido!']"
          />
          <q-input
            rounded
            outlined
            v-model="userData.email"
            label="Seu e-mail"
            hint="digite um e-mail válido"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'E-mail inválido !']"
          />
          <q-input
            rounded
            outlined
            type="password"
            v-model="userData.password"
            label="Sua senha"
            lazy-rules
            :rules="[
          val => val !== null && val !== '' || 'Senha não pode está vazio !']"
          />
           <q-select @input="getStates(userData.country)" style="padding-bottom: 20px;" rounded outlined v-model="userData.country" :options="countrys" label="País" />

           <q-select @input="getCitys(userData)" style="padding-bottom: 20px;" rounded outlined v-model="userData.state" :options="states" label="Estado" />

           <q-select style="padding-bottom: 20px;" rounded outlined v-model="userData.city" :options="citys" label="Cidade" />

         <div class="col-xs-12 col-sm-12 col-md-5 col-lg-3 col-xl-3">
            <q-input
            rounded
            outlined
            type = 'text'
            v-model="userData.street"
            label="Logradouro, 0"
          />
        </div>
        </q-card-section>
        <div class="row q-pa-md justify-center">
        <q-card-actions>
         <q-btn @click="signUp(userData)" label="Cadastrar" type="submit" color="primary"/>
          <q-btn @click="goLogin()" label="Login" type="submit" color="secondary"/>
        </q-card-actions>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'SignUp',
  data () {
    return {
      typeProviders: [
        { label: 'Pessoa Física',
          value: 'PERSON'
        },
        { label: 'Pessoa jurídica',
          value: 'ENTITY'
        }
      ],
      profiles: [
        { label: 'Usuário',
          value: 'CLIENT',
          icon: 'user'
        },
        {
          label: 'Prestador de serviços',
          value: 'PROVIDER',
          icon: 'mail'
        }
      ],
      card: false,
      userData: {
        profile: '',
        typeProvider: ''
      }
    }
  },
  computed: {
    ...mapState('eventos', ['events', 'countrys', 'states', 'citys']),
    ...mapState('usuarios', ['categoryProviders', 'codesCellphone'])
  },
  methods: {
    ...mapActions('usuarios', ['signUp', 'getCategoryProviders', 'getCodeCellphoneCountrys']),
    ...mapActions('eventos', ['getCountrys', 'getStates', 'getCitys']),
    abrirModal () {
      this.card = true
    },
    goLogin () {
      this.$router.push('/auth/sign-in')
    },
    getCategories () {
      if (this.userData.profile.value === 'PROVIDER') {
        this.getCategoryProviders()
      }
    }
  },
  mounted () {
    this.abrirModal()
    this.getCountrys()
    this.getCodeCellphoneCountrys()
  }
}
</script>

<style lang="stylus" scoped>
  /* .container{
    background: $primary;
  } */

    .container{
    background url('../../assets/fest.jpg') no-repeat center center fixed
    background-size cover
    opacity: 0.6
    }
</style>
