<template>
  <v-container class="ma-0 pa-5">
    <v-row class="align-center">
      <v-icon size="xx-large">mdi-arm-flex</v-icon>
      <h1>Exercícios</h1>
    </v-row>

    <v-form @submit.prevent="addExercise">
      <v-text-field
        v-model="description"
        label="Nome do exercício"
        class="mt-5"
        :error-messages="errors.description"
      ></v-text-field>
      <v-btn type="submit">Cadastrar</v-btn>

      <v-snackbar v-model="snackbar" :timeout="duration" color="success" location="top">
        Cadastrado com sucesso!
      </v-snackbar>
    </v-form>

    <v-table>
      <thead>
        <tr>
          <th>Nome</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="exercise in exercises" :key="exercise.id">
          <td>{{ exercise.description }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

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
