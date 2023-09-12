<template>
  <v-layout>
    <v-navigation-drawer
      theme="dark"
      v-model="drawer"
      permanent
      width="15%"
      class="pl-4"
      id="sidebar"
      border="none"
    >
      <v-list-item
        ><img
          src="../../assets/gofit_logo_white.svg"
          alt="logo do sistema go!fit, no o possui o desenho de uma anilha."
          class="my-12 pb-5 w-75 mx-auto d-block"
      /></v-list-item>

      <v-list nav dense class="ma-0 pa-0">
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.link" link :ripple="false">
          <v-list-item
            class="font-weight-bold pl-lg-6"
            :prepend-icon="item.icon"
            active-class="border"
            >{{ item.text }}</v-list-item
          >
        </v-list-item>
        <v-list-item><!-- item adicionado para permitir arredondamento borda menu --></v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pb-10 pr-4">
          <v-btn block append-icon="mdi-logout" variant="plain" @click="logout">Sair</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-layout>
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
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
nav {
  width: 15%;
}

/* Estilo arredondamento bordas menu */
#sidebar .v-list-item {
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  text-decoration: none;
}

#sidebar .v-list-item--active {
  background: #fff;
  color: #424242;
  margin-right: -10px;
}
#sidebar .v-list-item--active::before {
  position: absolute;
  content: '';
  width: 30px;
  height: 30px;
  background-color: #212121;
  top: -30px;
  right: 0;
  border-radius: 1rem;
  box-shadow: 15px 15px 0px white;
  z-index: 1005;
}
#sidebar .v-list-item--active + .v-list-item::before {
  position: absolute;
  content: '';
  width: 30px;
  height: 30px;
  background-color: #212121;
  top: -4px;
  right: 0;
  border-radius: 1rem;
  box-shadow: 15px -15px 0px white;
  z-index: 1005;
}
</style>
