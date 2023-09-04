<template>
  <h1><v-icon>mdi-account-multiple</v-icon>Treino</h1>

  <v-form>
    <v-select
      v-model="selectedExercise"
      label="Exercício"
      :items="exercises"
      item-title="description"
      item-value="id"
    ></v-select>
    <v-text-field v-model="repetitions" label="Repetições" type="number"></v-text-field>
    <v-text-field v-model="weight" label="Peso (kg)" type="number"></v-text-field>
    <v-text-field v-model="breakTime" label="Pausa" type="time"></v-text-field>
    <v-select v-model="weekDay" label="Dia da semana"></v-select>
    <v-textarea v-model="comments" label="Observações"></v-textarea>
    <router-link to="/students"><v-btn>Cancelar</v-btn></router-link>
    <v-btn type="submit">Cadastrar</v-btn>
  </v-form>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      exercises: [],
      selectedExercise: '',
      repetitions: '',
      weight: '',
      breakTime: '',
      weekDay: '',
      comments: ''
    }
  },
  mounted() {
    this.getExercises()
  },
  methods: {
    getExercises() {
      axios.get('http://localhost:3000/exercises').then(({ data }) => {
        this.exercises = data
      })
    }
  }
}
</script>
