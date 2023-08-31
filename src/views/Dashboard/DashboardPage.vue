<template>
  <h1>Bem-vindo, {{ userName }}!</h1>
</template>

<script>
export default {
  data() {
    return {
      userName: ''
    }
  },
  mounted() {
    this.getUserName()
  },
  methods: {
    getUserName() {
      const loggedUserData = JSON.parse(localStorage.getItem('logged_user'))
      this.userName = loggedUserData.name
    }
  }
}
</script>
