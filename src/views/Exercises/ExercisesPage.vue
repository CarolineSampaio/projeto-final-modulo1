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
          ref="form"
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

        <div>
          <v-snackbar v-model="snackbarSuccess" :timeout="duration" color="success" location="top">
            Cadastrado com sucesso!
          </v-snackbar>
          <v-snackbar v-model="signUpError" :timeout="duration" color="red-darken-2" location="top">
            Erro ao cadastrar exercício!
          </v-snackbar>
          <v-snackbar v-model="loadError" :timeout="duration" color="red-darken-2" location="top">
            Erro ao carregar exercícios!
          </v-snackbar>
        </div>
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
      snackbarSuccess: false,
      signUpError: false,
      loadError: false,
      duration: 3000,
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
          this.loadError = true
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
            this.snackbarSuccess = true
            this.getExercises()
            this.$refs.form.reset()
          })
          .catch((error) => {
            console.log(error)
            this.signUpError = true
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

<style scoped>
.container {
  width: 100%;
  min-height: 100%;
}
</style>
