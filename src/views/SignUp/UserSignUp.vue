<template>
  <v-form>
    <v-text-field v-model="name" label="Nome completo"></v-text-field>
    <v-text-field v-model="email" label="E-mail"></v-text-field>
    <v-text-field v-model="password" label="Senha" type="password"></v-text-field>
    <v-text-field v-model="confirmPassword" label="Confirme a senha" type="password"></v-text-field>
    <v-select model-value="bronze" label="Plano" :items="typePlan"></v-select>
    <v-btn>Cadastrar</v-btn>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      typePlan: [
        { value: 'bronze', title: 'Bronze' },
        { value: 'prata', title: 'Prata' },
        { value: 'ouro', title: 'Ouro' }
      ]
    }
  }
}
</script>
