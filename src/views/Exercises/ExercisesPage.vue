<template>
  <v-container class="ma-0 pa-5">
    <v-row class="align-center">
      <v-icon size="xx-large">mdi-arm-flex</v-icon>
      <h1>Exercícios</h1>
    </v-row>

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
