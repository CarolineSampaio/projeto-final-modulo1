<template>
  <v-form>
    <v-text-field v-model="email" label="E-mail" type="email"></v-text-field>
    <v-text-field v-model="password" label="Senha" type="password"></v-text-field>
    <v-btn>Logar</v-btn>
  </v-form>

  <div>
    <p>Ainda não tem conta?<router-link to="/signup"> Cadastre-se</router-link></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  }
}
</script>
