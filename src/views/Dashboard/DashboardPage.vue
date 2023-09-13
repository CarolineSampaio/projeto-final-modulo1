<template>
  <div class="container">
    <h1 class="py-12 font-weight-medium">Dashboard</h1>

    <v-card class="welcomeMessage">
      <v-row class="ma-2">
        <v-col class="ml-7 my-14">
          <h2 class="font-weight-bold">Olá, {{ userName }}!</h2>
          <h3 class="mt-3 font-weight-medium">
            O sucesso de seus alunos começa com você. Vamos começar!
          </h3>
        </v-col>
        <v-col cols="6" class="d-flex justify-end">
          <img
            src="../../assets/woman_pilates.svg"
            alt="Mulher fazendo pilates."
            class="welcomeImage"
          />
        </v-col>
      </v-row>
    </v-card>

    <div class="d-flex justify-space-between align-center mt-16 teste">
      <v-card class="managementCards">
        <v-row class="ma-2">
          <v-col>
            <img
              src="../../assets/students.svg"
              alt="imagem vetorizada de três mulheres com roupa de academia."
              class="imageCards"
            />
          </v-col>
          <v-col class="d-flex flex-column justify-space-evenly align-center">
            <v-card-title class="text-h5 font-weight-bold">
              <span class="text-h4 font-weight-bold">{{ amountStudents }}</span>
              Alunos Cadastrados
            </v-card-title>
            <router-link to="/students/new">
              <v-btn
                size="large"
                variant="flat"
                color="grey-darken-3 text-amber"
                class="font-weight-bold"
              >
                Adicionar Aluno
              </v-btn>
            </router-link>
          </v-col>
        </v-row>
      </v-card>

      <v-card class="managementCards">
        <v-row class="ma-2">
          <v-col>
            <img
              src="../../assets/exercises.svg"
              alt="imagem vetorizada de três mulheres com roupa de academia."
              class="imageCards"
            />
          </v-col>
          <v-col class="d-flex flex-column justify-space-evenly align-center">
            <v-card-title class="text-h5 font-weight-bold">
              <span class="text-h4 font-weight-bold">{{ amountExercises }}</span>
              Exercícios Cadastrados
            </v-card-title>
            <router-link to="/exercises">
              <v-btn
                size="large"
                variant="flat"
                color="grey-darken-3 text-amber"
                class="font-weight-bold"
              >
                Adicionar Exercício
              </v-btn>
            </router-link>
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
  width: 100%;
  height: 22%;
  background-color: #ffca28;
  border-radius: 2rem;
  overflow: initial;
}
.welcomeImage {
  height: 35vh;
  transform: translateY(-42%);
}
.managementCards {
  width: 48%;
  height: 50vh;
  background-color: #ffca28;
  border-radius: 2rem;
}
.imageCards {
  height: 45vh;
}
</style>
