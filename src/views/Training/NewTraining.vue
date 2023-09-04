<template>
  <h1><v-icon>mdi-account-multiple</v-icon>Treino</h1>

  <v-form>
    <v-select v-model="selectedExercise" label="Exercício"></v-select>
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
export default {
  data() {
    return {
      selectedExercise: '',
      repetitions: '',
      weight: '',
      breakTime: '',
      weekDay: '',
      comments: ''
    }
  }
}
</script>
