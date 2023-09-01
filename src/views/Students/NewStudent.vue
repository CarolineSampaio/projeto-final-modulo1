<template>
  <h1><v-icon>mdi-account-multiple</v-icon>Alunos</h1>

  <v-form>
    <v-text-field v-model="name" label="Nome completo" type="text"></v-text-field>
    <v-text-field v-model="email" label="E-mail" type="email"></v-text-field>
    <v-text-field v-model="contact" label="Contato" type="text"></v-text-field>
    <v-text-field v-model="dateBirth" label="Data de Nascimento" type="date"></v-text-field>

    <v-text-field v-model="cep" label="CEP" type="text"></v-text-field>
    <v-text-field v-model="street" label="Logradouro" type="text"></v-text-field>
    <v-text-field v-model="number" label="Número" type="text"></v-text-field>
    <v-text-field v-model="neighborhood" label="Bairro" type="text"></v-text-field>
    <v-text-field v-model="city" label="Cidade" type="text"></v-text-field>
    <v-text-field v-model="state" label="Estado" type="text"></v-text-field>
    <v-text-field v-model="complement" label="Complemento" type="text"></v-text-field>

    <v-btn>Cadastrar</v-btn>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      contact: '',
      dateBirth: '',
      cep: '',
      street: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',
      complement: ''
    }
  }
}
</script>
