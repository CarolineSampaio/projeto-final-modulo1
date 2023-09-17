<template>
  <div class="container" :style="mdAndDown ? 'padding-left: 5%' : 'padding-left: 20%'">
    <div class="d-flex align-center" :style="smAndDown ? 'justify-content:center;' : ''">
      <h1 class="py-4 py-md-12 font-weight-medium" :style="smAndDown ? 'font-size:1.5rem' : ''">
        Treinos - {{ studentName }}
      </h1>
      <v-icon size="x-large" class="pl-10" color="amber">mdi-account-outline</v-icon>
    </div>

    <div class="cardImage">
      <div class="cardContent" :style="smAndDown ? 'flex-direction: column;  padding:8%' : ''">
        <h2 class="pb-2 pb-sm-5 font-weight-medium">Hoje</h2>
        <div v-for="workout in workoutTable[today]" :key="workout">
          <v-checkbox
            :label="`
            ${workout.exercise_description} | ${workout.weight}KG | 
            ${workout.repetitions} repetições | ${formatBreakTime(workout.break_time)}`"
            v-model="workout.checked"
            v-bind:true-value="1"
            @click="markAsChecked(workout.id)"
            hide-details
            :style="smAndDown ? 'padding-top: 5%;' : ''"
          >
          </v-checkbox>
        </div>

        <v-card class="my-12 pb-5">
          <v-tabs v-model="activeTab" align-tabs="center">
            <v-tab :value="1">Segunda</v-tab>
            <v-tab :value="2">Terça</v-tab>
            <v-tab :value="3">Quarta</v-tab>
            <v-tab :value="4">Quinta</v-tab>
            <v-tab :value="5">Sexta</v-tab>
            <v-tab :value="6">Sábado</v-tab>
            <v-tab :value="0">Domingo</v-tab>
          </v-tabs>
          <v-window v-model="activeTab">
            <v-window-item v-for="workoutDay in workoutTable" :key="workoutDay">
              <v-container fluid>
                <v-table>
                  <tbody>
                    <tr v-for="workout in workoutDay" :key="workout" class="d-none d-sm-table-row">
                      <td class="pa-sm-2">{{ workout.exercise_description }}</td>
                      <td class="pa-sm-2">{{ workout.weight }}KG</td>
                      <td class="pa-sm-2">{{ workout.repetitions }} repetições</td>
                      <td class="pa-sm-2">Pausa de {{ formatBreakTime(workout.break_time) }}</td>
                    </tr>

                    <!-- tr para telas < 600px -->
                    <tr v-for="workout in workoutDay" :key="workout" class="d-sm-none">
                      <td class="pa-1 ma-1 mb-2 text-center">
                        <div class="mb-2 text-body-2">{{ workout.exercise_description }}</div>
                        <div class="mb-2 text-body-2">{{ workout.weight }} KG</div>
                      </td>
                      <td class="pa-1 ma-1 mb-2 text-center">
                        <div class="mb-2 text-body-2">{{ workout.repetitions }} repetições</div>
                        <div class="mb-2 text-body-2">
                          {{ formatBreakTime(workout.break_time) }} de pausa
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-container>
            </v-window-item>
          </v-window>
        </v-card>

        <div>
          <v-row>
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
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
    <v-snackbar v-model="snackbarError" :timeout="duration" color="red-darken-2" location="top">
      {{ errorMessage }}
    </v-snackbar>
  </div>
</template>

<script setup>
import { useDisplay } from 'vuetify'
const { smAndDown, mdAndDown } = useDisplay()
</script>

<script>
import axios from 'axios'
import { getToken } from '../../utils/auth'
import { API_URL } from '../../utils/constants'

export default {
  data() {
    return {
      studentId: this.$route.params.id,
      studentName: '',
      weekDays: ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'],
      workoutTable: [[], [], [], [], [], [], []],
      today: new Date().getDay(),
      activeTab: null,
      token: getToken(),

      snackbarError: false,
      errorMessage: '',
      duration: 3000
    }
  },
  mounted() {
    this.getStudentName()
    this.getTraining()
    this.activeTab = this.today
  },
  methods: {
    getTraining() {
      axios
        .get(`${API_URL}/workouts?student_id=${this.studentId}`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        .then(({ data }) => this.createWorkoutTable(data.workouts))
        .catch((error) => {
          console.log(error)
          this.snackbarError = true
          this.errorMessage = 'Houve um erro ao carregar os treinos'
        })
    },
    createWorkoutTable(trainings) {
      trainings.forEach((training) => {
        const weekDay = this.weekDays.indexOf(training.day)
        this.workoutTable[weekDay].push(training)
      })
    },
    markAsChecked(workout_id) {
      console.log(this.weekDays[this.today], this.studentId, workout_id)

      axios
        .post(
          `${API_URL}/workouts/check`,
          {
            workout_id,
            student_id: this.studentId,
            day_of_week: this.weekDays[this.today]
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`
            }
          }
        )
        .then(() => console.log('Marcado como realizado!'))
        .catch((error) => {
          console.log(error)

          this.snackbarError = true
          this.errorMessage = 'Houve um erro ao marcar como realizado!'
        })
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
    },
    formatBreakTime(breakTime) {
      const [minutes, seconds] = breakTime.split(':')
      if (minutes === '00') {
        return `${seconds} segundos`
      } else {
        return `${minutes} min e ${seconds} seg`
      }
    }
  }
}
</script>

<style scoped>
.v-slide-group-item--active {
  background-color: #ffc107 !important;
}
.v-card {
  background-color: rgba(255, 255, 255, 0.5) !important;
  box-shadow:
    inset 1px 1px 0px 0px var(--v-shadow-key-penumbra-opacity, rgba(255, 255, 255, 0.8)),
    1px 1px 0px var(--v-shadow-key-penumbra-opacity, rgba(225, 225, 225, 0.8));
}

td {
  width: 25%;
}
</style>
