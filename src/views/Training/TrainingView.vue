<template>
  <h1><v-icon>mdi-account-multiple</v-icon>Treinos - {{ studentName }}</h1>

  <h2>Hoje</h2>

  <div v-for="workout in workoutTable[2]" :key="workout">
    <v-checkbox
      :label="`${workout.exercise_description} | ${workout.weight}KG | ${workout.repetitions} repetições | ${workout.break_time} segundos de pausa`"
      v-model="workout.checked"
      v-bind:true-value="1"
      @click="markAsChecked(workout.id)"
      hide-details
    ></v-checkbox>
  </div>

  <v-card>
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
              <tr v-for="workout in workoutDay" :key="workout">
                <td>{{ workout.exercise_description }}</td>
                <td>{{ workout.weight }}KG</td>
                <td>{{ workout.repetitions }} repetições</td>
                <td>{{ workout.break_time }} segundos de pausa</td>
              </tr>
            </tbody>
          </v-table>
        </v-container>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      studentId: this.$route.params.id,
      studentName: '',
      weekDays: ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'],
      workoutTable: [[], [], [], [], [], [], []],
      today: new Date().getDay(),
      activeTab: null
    }
  },
  mounted() {
    this.getTraining()
    this.activeTab = this.today
  },
  methods: {
    getTraining() {
      axios
        .get(`http://localhost:3000/workouts?student_id=${this.studentId}`)
        .then(({ data }) => this.createWorkoutTable(data.workouts))
        .catch((error) => {
          console.log(error)
          alert('Houve um erro ao carregar os treinos')
        })
    },
    createWorkoutTable(trainings) {
      trainings.forEach((training) => {
        const weekDay = this.weekDays.indexOf(training.day)
        this.workoutTable[weekDay].push(training)
        this.studentName = this.studentName || training.student_name
      })
    },
    markAsChecked(workout_id) {
      console.log(this.weekDays[this.today], this.studentId, workout_id)

      axios
        .post('http://localhost:3000/workouts/check', {
          workout_id,
          student_id: this.studentId,
          day_of_week: this.weekDays[this.today]
        })
        .then(() => console.log('Marcado como feito'))
        .catch((error) => {
          console.log(error)
          alert('Houve um erro ao marcar como feito')
        })
    }
  }
}
</script>
