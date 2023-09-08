<template>
  <MenuPag v-if="renderMenu" />
  <router-view></router-view>
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
