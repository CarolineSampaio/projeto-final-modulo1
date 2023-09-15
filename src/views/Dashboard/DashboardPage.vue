<template>
  <div class="container" :style="mdAndDown ? 'padding-left: 5%' : ''">
    <h1 class="py-4 py-md-12 font-weight-medium" :style="smAndDown ? 'text-align:center;' : ''">
      Dashboard
    </h1>

    <v-card class="welcomeMessage d-flex align-flex-end">
      <v-row class="ma-2">
        <v-col class="ml-2 ml-md-7 my-4 my-md-6 my-lg-12">
          <h2 class="font-weight-bold">Olá, {{ userName }}!</h2>
          <h3 class="mt-3 font-weight-medium">
            O sucesso de seus alunos começa com você. Vamos começar!
          </h3>
        </v-col>
        <v-col cols="0" md="6" class="d-flex justify-end pr-0">
          <img
            src="../../assets/woman_pilates.svg"
            alt="Mulher fazendo pilates."
            class="welcomeImage hidden-sm-and-down"
            :style="
              smAndDown
                ? 'height: 25vh; transform: translateY(-20%);'
                : 'height: 35vh; transform: translateY(-45%);'
            "
          />
        </v-col>
      </v-row>
    </v-card>

    <div
      class="d-flex justify-space-between align-center mt-5 mt-md-16"
      :style="smAndDown ? 'flex-direction: column;' : 'flex-direction: row'"
    >
      <v-card
        class="managementCards"
        :style="
          smAndDown
            ? 'width: 100%; margin-bottom: 5%'
            : 'width: 48%; height: 50%; margin-bottom: 2%'
        "
      >
        <v-row class="ma-2">
          <v-col cols="12" lg="6" class="d-flex align-center justify-center pa-0">
            <img
              src="../../assets/students.svg"
              alt="imagem vetorizada de três mulheres com roupa de academia."
              class="imageCards"
            />
          </v-col>
          <v-col cols="12" lg="6" class="d-flex flex-column justify-space-evenly align-center pa-0">
            <v-card-title
              class="text-h6 text-md-h5 font-weight-bold"
              :style="lgAndDown ? 'white-space: break-spaces; text-align: center' : ''"
            >
              <span class="text-h4 font-weight-bold">{{ amountStudents }}</span>
              Alunos Cadastrados
            </v-card-title>
            <router-link to="/students/new">
              <v-btn
                size="large"
                variant="elevated"
                color="grey-darken-4 text-amber"
                class="font-weight-bold"
                :ripple="false"
              >
                Adicionar
              </v-btn>
            </router-link>
          </v-col>
        </v-row>
      </v-card>

      <v-card
        class="managementCards"
        :style="
          smAndDown
            ? 'width: 100%; margin-bottom: 5%'
            : 'width: 48%; height: 50%; margin-bottom: 2%'
        "
      >
        <v-row class="ma-2">
          <v-col cols="12" lg="6" class="d-flex align-center justify-center pa-0">
            <img
              src="../../assets/exercises.svg"
              alt="imagem vetorizada de três mulheres com roupa de academia."
              class="imageCards"
            />
          </v-col>
          <v-col cols="12" lg="6" class="d-flex flex-column justify-space-evenly align-center pa-0">
            <v-card-title
              class="text-h6 text-md-h5 font-weight-bold"
              :style="lgAndDown ? 'white-space: break-spaces; text-align: center' : ''"
            >
              <span class="text-h4 font-weight-bold">{{ amountExercises }}</span>
              Exercícios Cadastrados
            </v-card-title>
            <router-link to="/exercises">
              <v-btn
                size="large"
                variant="elevated"
                color="grey-darken-4 text-amber"
                class="font-weight-bold"
                :ripple="false"
              >
                Adicionar
              </v-btn>
            </router-link>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { useDisplay } from 'vuetify'
const { smAndDown, mdAndDown, lgAndDown } = useDisplay()
</script>

<script>
import axios from 'axios'
import { getToken } from '../../utils/auth'
import { API_URL } from '../../utils/constants'

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
        .get(`${API_URL}/dashboard`, {
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
}
.welcomeMessage,
.managementCards {
  border-radius: 2rem;
  background: rgb(255, 212, 80);
  background: linear-gradient(160deg, rgba(255, 212, 80, 1) 0%, rgba(222, 167, 0, 1) 100%);
  box-shadow:
    12px 16px 28px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
    0px 2px 2px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
    0px 2px 4px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12)),
    inset 1px 1px 0px 0px var(--v-shadow-key-penumbra-opacity, rgba(255, 255, 255, 0.8));
}
.welcomeMessage {
  width: 100%;
  height: 22%;

  overflow: initial;
}
.imageCards {
  height: 90%;
  object-fit: cover;
}
.v-btn:hover {
  background-color: #303030 !important;
}
</style>
