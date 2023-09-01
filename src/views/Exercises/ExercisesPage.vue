<template>
  {{ exercises }}
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      exercises: []
    }
  },
  mounted() {
    this.getExercises()
  },
  methods: {
    getExercises() {
      axios
        .get('http://localhost:3000/exercises')
        .then((response) => {
          console.log(response.data)
          this.exercises = response.data
        })
        .catch((error) => {
          console.log(error)
          alert('Erro ao carregar exercícios!')
        })
    }
  }
}
</script>
