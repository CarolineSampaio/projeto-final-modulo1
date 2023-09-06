<template>
  <h1><v-icon>mdi-account-multiple</v-icon>Treinos</h1>

  <h2>Hoje</h2>

  <v-row v-for="workout in workoutTable[today]" :key="workout" cols="12" md="4">
    <v-checkbox
      label="Checkbox"
      v-model="workout.checked"
      v-bind:true-value="1"
      @click="markAsChecked(workout.id)"
    ></v-checkbox>
    {{ workout.exercise_description }}
  </v-row>

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
          <v-row v-for="workout in workoutDay" :key="workout" cols="12" md="4">
            {{ workout.exercise_description }}
          </v-row>
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
      })
    },
    markAsChecked(workout_id) {
      console.log(this.weekDays[this.today], this.studentId, workout_id)
    }
  }
}
</script>
