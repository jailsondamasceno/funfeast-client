<template>
  <q-page class="container">
    <div  class="q-pa-md">
      <div class="row justify-between">
      <div class="row justify-start text-h6">MOVIMENTAÇÕES</div>
      <div class="row justify-end"><span style="font-size: 30px;">{{`Saldo: `}}<span :style="colorBalance">{{`R$ ${balanceWallet},00`}}</span></span></div>
      </div>
      <q-btn @click="buyModal = true" style="margin: 5px;" class="shadow-15" rounded color="white" icon="add"  text-color="primary" label="Fazer uma Recarga"></q-btn>
    </div>
      <q-separator />
    <div class="row justify-center">
    <div class="walletItens">
      <q-card-section class="scroll">
    <div class="q-pa-md" v-for="movimentation in wallet"
    :key="movimentation.id">
    <q-list>
      <q-item style="border-radius: 5px;" clickable v-ripple class="shadow-15">
    <q-item-section style="padding: 5px;" avatar>
      <q-avatar v-if="movimentation.type === 'CREDITO'">
        <q-icon name="add" color="green" />
      </q-avatar>
      <q-avatar v-else>
        <q-icon name="remove" color="red" />
      </q-avatar>
    </q-item-section>
    <q-item-section style="padding: 5px;">
      {{`${movimentation.description}`}}
    </q-item-section>
    <q-item-section style="padding: 5px; font-weight: bold;">
      {{`R$ ${movimentation.value}`}}
    </q-item-section>
  </q-item>
    </q-list>
    </div>
    </q-card-section>
    </div>
    </div>

      <q-dialog v-model="buyModal">
        <q-card>
          <div class="col content-center items-center">
            <div class="row q-pa-md justify-center">
              <q-avatar>
                 <q-icon style="font-size: 2em;" name="monetization_on" />
              </q-avatar>
            </div>
        <q-card-section>
          <q-input
            rounded
            outlined
            type="number"
            v-model="creditoValue"
            label="Valor"
            lazy-rules
             :rules="[ val => val && val.length > 0 || 'Valor Inválido!']"
          />
        </q-card-section>
        <div class="row q-pa-md justify-center">
        <q-card-actions>
           <q-btn @click="true" label="Depositar" type="submit" color="primary"/>
           <q-btn  label="Cancelar" type="submit" color="secondary"  v-close-popup/>
        </q-card-actions>
        </div>
         </div>
         </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Wallet',
  data () {
    return {
      creditoValue: '',
      buyModal: false
    }
  },
  computed: {
    ...mapState('usuarios', ['currentUser', 'wallet', 'balanceWallet']),
    colorBalance () {
      return this.balanceWallet <= 0 ? 'font-size: 40px; color: red;' : 'font-size: 40px; color: green;'
    }
  },
  methods: {
    ...mapActions('usuarios', ['movimetationsWallet']),
    buyCredit () {
      return false
    }
  },
  mounted () {
    this.movimetationsWallet(this.currentUser.id)
  }
}
</script>

<style lang="stylus" scoped>
  .walletItens{
     width 500px
  }
  @media (max-width: 600px) {
    .walletItens{
    width 100%
    }
  }
</style>
