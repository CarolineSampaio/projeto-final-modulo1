<template>
  <div class="container" :style="mdAndDown ? 'padding-left: 5%' : 'padding-left: 20%'">
    <div class="d-flex align-center" :style="smAndDown ? 'justify-content:center;' : ''">
      <h1 class="py-4 py-md-12 font-weight-medium" :style="smAndDown ? 'font-size:1.5rem' : ''">
        Treino para {{ this.studentName }}
      </h1>
      <v-icon size="x-large" class="pl-10" color="amber">mdi-account-outline</v-icon>
    </div>

    <div class="cardImage">
      <div class="cardContent" :style="smAndDown ? 'flex-direction: column;  padding:8%' : ''">
        <v-form ref="form" @submit.prevent="createTraining">
          <v-row>
            <v-col cols="12">
              <v-autocomplete
                v-model="selectedExercise"
                label="Exercício"
                :items="exercises"
                item-title="description"
                item-value="id"
                variant="outlined"
                :error-messages="errors.selectedExercise"
                noDataText="Nenhum exercício encontrado"
              >
              </v-autocomplete>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="repetitions"
                label="Repetições"
                type="number"
                variant="outlined"
                :error-messages="errors.repetitions"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="weight"
                label="Peso (kg)"
                type="number"
                variant="outlined"
                :error-messages="errors.weight"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="breakTime"
                label="Pausa"
                type="time"
                min="00:10"
                max="10:00"
                variant="outlined"
                :rules="breakTimeRules"
                onclick="this.showPicker()"
                onfocus="this.showPicker()"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="weekDay"
                label="Dia da semana"
                :items="weekList"
                variant="outlined"
                :error-messages="errors.weekDay"
              >
              </v-select>
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="comments" label="Observações" variant="outlined"></v-textarea>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <router-link to="/students">
                <v-btn
                  variant="elevated"
                  size="large"
                  color="amber text-dark-grey-4"
                  class="font-weight-bold px-sm-2 px-md-10 mr-1 mr-md-4"
                  :ripple="false"
                >
                  Voltar
                </v-btn>
              </router-link>
              <v-btn
                type="submit"
                variant="elevated"
                size="large"
                color="grey-darken-4 text-amber"
                class="font-weight-bold px-sm-2 px-md-10 ml-1 ml-md-4"
                :ripple="false"
              >
                Cadastrar
              </v-btn>
            </v-col>
          </v-row>
        </v-form>

        <v-snackbar v-model="snackbarSuccess" :timeout="duration" color="success" location="top">
          Treino cadastrado com sucesso!
        </v-snackbar>
        <v-snackbar v-model="snackbarError" :timeout="duration" color="red" location="top">
          Houve uma falha ao tentar cadastrar o treino!
        </v-snackbar>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDisplay } from 'vuetify'
const { smAndDown, mdAndDown } = useDisplay()
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
      studentId: this.$route.params.id,
      studentName: '',
      exercises: [],
      selectedExercise: '',
      repetitions: null,
      weight: null,
      breakTime: '00:00',
      weekDay: '',
      weekList: [
        { value: 'domingo', title: 'Domingo' },
        { value: 'segunda', title: 'Segunda-Feira' },
        { value: 'terca', title: 'Terça-Feira' },
        { value: 'quarta', title: 'Quarta-Feira' },
        { value: 'quinta', title: 'Quinta-Feira' },
        { value: 'sexta', title: 'Sexta-Feira' },
        { value: 'sabado', title: 'Sábado' }
      ],
      comments: '',
      errors: [],

      snackbarSuccess: false,
      snackbarError: false,
      duration: 3000,
      token: getToken()
    }
  },
  mounted() {
    this.getStudentName()
    this.getExercises()
    this.weekDay = this.currentWeekDay()
  },
  methods: {
    getExercises() {
      axios
        .get(`${API_URL}/exercises`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        .then(({ data }) => (this.exercises = data))
    },
    createTraining() {
      const schema = yup.object().shape({
        selectedExercise: yup.string().required('Selecione um exercício da lista.'),
        repetitions: yup.number().required('Insira no mínimo uma repetição.'),
        weight: yup.number().required('Forneça o peso para a execução do exercício.'),
        weekDay: yup.string().required('Selecione um dia da semana.')
      })

      try {
        schema.validateSync(
          {
            selectedExercise: this.selectedExercise,
            repetitions: this.repetitions,
            weight: this.weight,
            weekDay: this.weekDay
          },
          { abortEarly: false }
        )
        this.errors = {}

        axios
          .post(
            `${API_URL}/workouts`,
            {
              student_id: this.studentId,
              exercise_id: this.selectedExercise,
              repetitions: this.repetitions,
              weight: this.weight,
              break_time: this.breakTime,
              day: this.weekDay,
              observations: this.comments || ''
            },
            {
              headers: {
                Authorization: `Bearer ${this.token}`
              }
            }
          )
          .then(() => {
            this.snackbarSuccess = true
            this.$refs.form.reset()
            this.breakTime = '00:00'
            this.weekDay = this.currentWeekDay()
          })
          .catch((error) => {
            console.log(error)
            this.snackbarError = true
          })
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          console.log(error)
          this.errors = captureErrorYup(error)
        }
      }
    },
    currentWeekDay() {
      const weekDay = new Date().getDay()
      return this.weekList[weekDay].value
    },
    getStudentName() {
      /* Como a API não está preparada para retornar via id, estou fazendo uma requisição para buscar todos os alunos
      e em seguida, filtrando para pegar o nome do aluno correspondente ao id da url*/
      axios
        .get(`${API_URL}/students`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        .then(({ data }) => {
          const studentId = parseInt(this.studentId)
          const lista = data.students
          const alunoEncontrado = lista.find((aluno) => aluno.id === studentId)

          if (alunoEncontrado) {
            this.studentName = alunoEncontrado.name
          }
        })
    }
  },
  computed: {
    breakTimeRules() {
      console.log(this.breakTime)
      return [
        (v) => !!v || 'Forneça o tempo de pausa entre as repetições do exercício.',
        (v) => v >= '00:10' || 'A pausa mínima é de 10 segundos',
        (v) => v <= '10:00' || 'A pausa máxima é de 10 minutos'
      ]
    }
  }
}
</script>
