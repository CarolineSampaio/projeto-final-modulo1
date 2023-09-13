<template>
  <div class="container">
    <h1 class="my-10 font-weight-medium">Dashboard</h1>

    <div class="d-flex justify-space-between align-center mt-16 mcards">
      <v-card width="400px" height="700px" class="welcomeMessage">
        <v-row class="ma-2 align-center">
          <v-col>
            <h2 class="font-weight-bold">Olá, {{ userName }}!</h2>
            <h4 class="mt-3 font-weight-medium">
              O sucesso de seus alunos começa com você. Vamos começar!
            </h4>
          </v-col>
          <v-col cols="9">
            <img src="../../assets/woman_pilates.png" alt="Welcome" height="300" />
          </v-col>
        </v-row>
      </v-card>

      <v-card width="400px" height="700px" class="welcomeMessage">
        <v-row class="ma-2 align-center">
          <v-col>
            <img src="../../assets/woman_pilates.png" alt="Welcome" height="300" />
          </v-col>
          <v-col cols="9">
            <v-card-title>{{ amountStudents }} Alunos</v-card-title>
            <router-link to="/students/new"><v-btn>Adicionar</v-btn></router-link>
          </v-col>
        </v-row>
      </v-card>

      <v-card width="400px" height="700px" class="welcomeMessage">
        <v-row class="ma-2 align-center">
          <v-col>
            <img src="../../assets/woman_pilates.png" alt="Welcome" height="300" />
          </v-col>
          <v-col cols="9">
            <v-card-title>{{ amountExercises }} Exercícios</v-card-title>
            <router-link to="/exercises"><v-btn>Adicionar</v-btn></router-link>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { getToken } from '../../utils/auth'

export default {
  data() {
    return {
      userName: '',
      amountStudents: 0,
      amountExercises: 0,
      token: getToken()
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
        .get('http://localhost:3000/dashboard', {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
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
<style scoped>
.container {
  width: 100%;
  height: 100%;
  padding-left: 20%;
  padding-right: 5%;
}
.welcomeMessage {
  background-color: #ffca28;
  border-radius: 2rem;
  width: 100%;
}
.cards {
  width: 100%;
}
</style>
s
