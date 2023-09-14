<template>
  <div class="container" :style="mdAndDown ? 'padding-left: 5%' : 'padding-left: 20%'">
    <div class="d-flex align-center" :style="smAndDown ? 'justify-content:center;' : ''">
      <h1 class="py-4 py-md-12 font-weight-medium">Exercícios</h1>
      <v-icon size="x-large" class="pl-10" color="amber">mdi-weight-lifter</v-icon>
    </div>

    <div class="cardImage">
      <div
        class="cardContent"
        :style="smAndDown ? 'flex-direction: column;  padding:8%' : 'flex-direction: row'"
      >
        <v-form
          @submit.prevent="addExercise"
          class="d-flex"
          :style="xs ? 'flex-direction: column;' : 'flex-direction: row'"
        >
          <v-text-field
            v-model="description"
            label="Digite o nome do exercício"
            :error-messages="errors.description"
            variant="outlined"
            class="pl-md-2"
          >
          </v-text-field>
          <v-btn
            type="submit"
            variant="elevated"
            color="grey-darken-4 text-amber"
            class="font-weight-bold px-md-16 ml-sm-5 ml-md-10 mt-2 mt-md-0"
            height="60px"
            :ripple="false"
            :style="xs ? 'height: 45px;' : 'height: 60px'"
            >Cadastrar</v-btn
          >
        </v-form>

        <v-table class="mt-4 mt-md-10">
          <thead>
            <tr>
              <th class="font-weight-bold text-grey-darken-4">Nome do exercício</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="exercise in exercises" :key="exercise.id">
              <td>{{ exercise.description }}</td>
            </tr>
          </tbody>
        </v-table>

        <v-snackbar v-model="snackbar" :timeout="duration" color="success" location="top">
          Cadastrado com sucesso!
        </v-snackbar>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDisplay } from 'vuetify'
const { xs, smAndDown, mdAndDown } = useDisplay()
</script>

<script>
import axios from 'axios'
import * as yup from 'yup'
import { captureErrorYup } from '../../utils/captureErrorYup'
import { getToken } from '../../utils/auth'
import { API_URL } from '../../utils/constants'

export default {
  data() {
    return {
      exercises: [],
      description: '',
      errors: [],
      snackbar: false,
      duration: 2000,
      token: getToken()
    }
  },
  mounted() {
    this.getExercises()
  },
  methods: {
    getExercises() {
      axios
        .get(`${API_URL}/exercises`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        .then((response) => {
          console.log(response.data)
          this.exercises = response.data
        })
        .catch((error) => {
          console.log(error)
          alert('Erro ao carregar exercícios!')
        })
    },
    addExercise() {
      const schema = yup.object().shape({
        description: yup.string().required('Por favor, digite o nome do exercício.')
      })
      try {
        schema.validateSync(
          {
            description: this.description
          },
          { abortEarly: false }
        )
        this.errors = {}

        axios
          .post(
            `${API_URL}/exercises`,
            {
              description: this.description
            },
            {
              headers: {
                Authorization: `Bearer ${this.token}`
              }
            }
          )
          .then((response) => {
            console.log(response.data)
            this.snackbar = true
            this.getExercises()
            this.description = ''
          })
          .catch((error) => {
            console.log(error)
            alert('Erro ao cadastrar exercício!')
          })
      } catch (error) {
        console.log(error)
        if (error instanceof yup.ValidationError) {
          console.log(error)
          this.errors = captureErrorYup(error)
        }
      }
    }
  }
}
</script>

<style>
.container {
  width: 100%;
  min-height: 100%;
  padding-left: 20%;
  padding-right: 5%;
  padding-bottom: 2%;
}
.cardImage {
  border-radius: 2rem;
  background-image: url(../../assets/bg_pags.jpg);
  background-size: cover;
  box-shadow:
    12px 16px 28px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
    0px 2px 2px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
    0px 2px 4px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12)),
    inset 1px 1px 0px 0px var(--v-shadow-key-penumbra-opacity, rgba(255, 255, 255, 0.8));
  padding: 4%;
}
.cardContent {
  padding: 4%;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 2rem;
  box-shadow:
    inset 1px 1px 0px 0px var(--v-shadow-key-penumbra-opacity, rgba(255, 255, 255, 0.8)),
    1px 1px 0px var(--v-shadow-key-penumbra-opacity, rgba(230, 230, 230, 0.8));
}

.v-table {
  background-color: transparent !important;
}
</style>
