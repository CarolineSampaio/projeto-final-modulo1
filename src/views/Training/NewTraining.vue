<template>
  <h1><v-icon>mdi-account-multiple</v-icon>Treino</h1>

  <v-form ref="form" @submit.prevent="createTraining">
    <v-select
      v-model="selectedExercise"
      label="Exercício"
      :items="exercises"
      item-title="description"
      item-value="id"
      :error-messages="errors.selectedExercise"
    ></v-select>

    <v-text-field
      v-model="repetitions"
      label="Repetições"
      type="number"
      :error-messages="errors.repetitions"
    ></v-text-field>

    <v-text-field
      v-model="weight"
      label="Peso (kg)"
      type="number"
      :error-messages="errors.weight"
    ></v-text-field>

    <v-text-field
      v-model="breakTime"
      label="Pausa"
      type="time"
      min="00:00:10"
      max="00:10:00"
      :rules="breakTimeRules"
    ></v-text-field>

    <v-select
      v-model="weekDay"
      label="Dia da semana"
      :items="weekList"
      :error-messages="errors.weekDay"
    ></v-select>

    <v-textarea v-model="comments" label="Observações"></v-textarea>

    <router-link to="/students"><v-btn>Cancelar</v-btn></router-link>
    <v-btn type="submit">Cadastrar</v-btn>
  </v-form>

  <v-snackbar v-model="snackbarSuccess" :timeout="duration" color="success" location="top">
    Treino cadastrado com sucesso!
  </v-snackbar>
  <v-snackbar v-model="snackbarError" :timeout="duration" color="red" location="top">
    Houve uma falha ao tentar cadastrar o treino!
  </v-snackbar>
</template>

<script>
import axios from 'axios'
import * as yup from 'yup'
import { captureErrorYup } from '../../utils/captureErrorYup'
export default {
  data() {
    return {
      studentId: this.$route.params.id,
      exercises: [],
      selectedExercise: '',
      repetitions: null,
      weight: null,
      breakTime: '',
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
      duration: 2000
    }
  },
  mounted() {
    this.getExercises()
    this.weekDay = this.currentWeekDay()
  },
  methods: {
    getExercises() {
      axios.get('http://localhost:3000/exercises').then(({ data }) => {
        this.exercises = data
      })
    },
    createTraining() {
      const schema = yup.object().shape({
        selectedExercise: yup.string().required('Selecione um exercício da lista.'),
        repetitions: yup.number().required('Insira no mínimo uma repetição.'),
        weight: yup.number().required('Forneça o peso necessário para a execução do exercício.'),
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
          .post('http://localhost:3000/workouts', {
            student_id: this.studentId,
            exercise_id: this.selectedExercise,
            repetitions: this.repetitions,
            weight: this.weight,
            break_time: this.breakTime,
            day: this.weekDay,
            observations: this.comments
          })
          .then(() => {
            this.snackbarSuccess = true
            this.$refs.form.reset()
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
    }
  },
  computed: {
    breakTimeRules() {
      return [
        (v) => !!v || 'Forneça o tempo de pausa necessário entre as repetições do exercício.',
        (v) => v >= '00:00:10' || 'A pausa mínima é de 10 segundos',
        (v) => v <= '00:10:00' || 'A pausa máxima é de 10 minutos'
      ]
    }
  }
}
</script>
