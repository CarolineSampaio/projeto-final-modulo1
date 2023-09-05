<template>
  <h1><v-icon>mdi-account-multiple</v-icon>Treinos</h1>

  <h2>Hoje</h2>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      studentId: this.$route.params.id,
      workoutTable: []
    }
  },
  mounted() {
    this.getTraining()
  },
  methods: {
    getTraining() {
      axios
        .get(`http://localhost:3000/workouts?student_id=${this.studentId}`)
        .then(({ data }) => {
          this.workoutTable = data
          console.log(this.workoutTable)
        })
        .catch((error) => {
          console.log(error)
          alert('Houve um erro ao carregar os treinos')
        })
    }
  }
}
</script>
