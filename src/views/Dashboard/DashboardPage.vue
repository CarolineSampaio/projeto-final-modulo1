<template>
  <h1>Bem-vindo, {{ userName }}!</h1>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      userName: '',
      amountExercises: 0,
      amountStudents: 0
    }
  },
  mounted() {
    this.getUserName(), this.getInfo()
  },
  methods: {
    getUserName() {
      const loggedUserData = JSON.parse(localStorage.getItem('logged_user'))
      this.userName = loggedUserData.name
    },
    getInfo() {
      axios
        .get('http://localhost:3000/dashboard')
        .then((response) => {
          console.log(response.data)
          this.amountExercises = response.data.amount_exercises
          this.amountStudents = response.data.amount_students
        })
        .catch((error) => {
          console.log(error)
          alert('Erro ao carregar informações do dashboard!')
        })
    }
  }
}
</script>
