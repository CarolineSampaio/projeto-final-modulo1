<template>
  <nav>
    <h1>Menu</h1>
    <router-link to="/">Home</router-link>
    <router-link to="/students">Alunos</router-link>
    <router-link to="/exercises">Exercícios</router-link>
    <router-link to="/login" @click="logout">Sair</router-link>
  </nav>
</template>

<script>
export default {
  name: 'MenuPag',

  methods: {
    logout() {
      localStorage.removeItem('logged_user')
    }
  }
}
</script>
