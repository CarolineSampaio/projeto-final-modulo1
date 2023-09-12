<template>
  <v-app>
    <MenuPag v-if="renderMenu" />
    <v-container class="container">
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
import MenuPag from './components/Menu/MenuPag.vue'

export default {
  name: 'App',
  components: {
    MenuPag
  },
  computed: {
    renderMenu() {
      return this.$route.path !== '/login' && this.$route.path !== '/signup'
    }
  }
}
</script>

<style>
.container {
  display: flex;
  flex: 1 auto;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  margin-left: 256px !important;
}
</style>
