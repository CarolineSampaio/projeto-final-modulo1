<template>
  <h1>Bem-vindo, {{ userName }}!</h1>
  <div class="d-flex">
    <v-card variant="outlined" width="300px">
      <v-row class="ma-2 align-center">
        <v-col cols="9">
          <v-card-title>{{ amountStudents }} Alunos</v-card-title>
          <router-link to="/students/new"><v-btn>Adicionar</v-btn></router-link>
        </v-col>
        <v-col cols="3">
          <v-icon size="xx-large">mdi-account</v-icon>
        </v-col>
      </v-row>
    </v-card>

    <v-card variant="outlined" width="300px">
      <v-row class="ma-2 align-center">
        <v-col cols="9">
          <v-card-title>{{ amountExercises }} Exercícios</v-card-title>
          <router-link to="/exercises"><v-btn>Adicionar</v-btn></router-link>
        </v-col>
        <v-col cols="3">
          <v-icon size="xx-large">mdi-arm-flex</v-icon>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      userName: '',
      amountStudents: 0,
      amountExercises: 0
    }
  },
  mounted() {
    this.getUserName(), this.getInfo()
  },
  methods: {
    getUserName() {
      const loggedUserData = JSON.parse(localStorage.getItem('logged_user'))
      this.userName = loggedUserData.name
    },
    getInfo() {
      axios
        .get('http://localhost:3000/dashboard')
        .then((response) => {
          console.log(response.data)
          this.amountExercises = response.data.amount_exercises
          this.amountStudents = response.data.amount_students
        })
        .catch((error) => {
          console.log(error)
          alert('Erro ao carregar informações do dashboard!')
        })
    }
  }
}
</script>
