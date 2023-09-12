<template>
  <v-navigation-drawer theme="dark" v-model="drawer" :rail="rail" permanent @click="rail = false">
    <v-list-item
      ><img
        src="../../assets/gofit_logo.svg"
        alt="logo do sistema go!fit, no o possui o desenho de uma anilha."
        class="my-5"
    /></v-list-item>

    <v-list nav dense>
      <v-list-item v-for="(item, i) in items" :key="i" :to="item.link" link>
        <v-icon>{{ item.icon }}</v-icon>

        <v-list-item-title>{{ item.text }}</v-list-item-title>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn block append-icon="mdi-logout"> Logout </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'MenuPag',
  data() {
    return {
      items: [
        {
          icon: 'mdi-view-dashboard-outline',
          text: 'Home',
          link: '/'
        },
        {
          icon: 'mdi-account-group-outline',
          text: 'Alunos',
          link: '/students'
        },
        {
          icon: 'mdi-weight-lifter',
          text: 'Exercícios',
          link: '/exercises'
        }
      ],
      drawer: true
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('logged_user')
    }
  }
}
</script>
