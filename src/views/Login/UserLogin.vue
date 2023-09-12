<template>
  <div class="d-flex ma-0 pa-0 container">
    <section class="left hidden-md-and-down">
      <div class="float">
        <h3>Em qualquer hora ou lugar...</h3>
        <span class="text-h3">Gerencie <span class="type-it"></span></span>
      </div>
      <img
        src="../../assets/bg_login.jpg"
        alt="imagem com barra e peso academia no chão."
        class="background"
      />
    </section>
    <section
      class="d-flex flex-column justify-center align-center right"
      :style="mdAndDown ? 'width: 100%' : 'width: 30%'"
    >
      <img
        src="../../assets/gofit_logo.svg"
        alt="logo do sistema go!fit, no o possui o desenho de uma anilha."
        class="mb-2 mb-lg-10"
        :style="mdAndDown ? 'width: 50%' : 'width: 60%'"
      />
      <p class="text-h6 text-grey-darken-1 mb-5">Acesse sua conta</p>
      <v-form @submit.prevent="handleLogin" class="d-flex flex-column justify-center">
        <v-text-field
          v-model="email"
          label="E-mail"
          type="email"
          :error-messages="errors.email"
          variant="outlined"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Senha"
          type="password"
          :error-messages="errors.password"
          variant="outlined"
        ></v-text-field>
        <v-btn
          type="submit"
          color="amber text-grey-darken-3"
          class="font-weight-bold mb-6"
          size="x-large"
          variant="flat"
          >Entrar</v-btn
        >
      </v-form>

      <p>Ainda não tem conta? <router-link to="/signup">Cadastre-se</router-link></p>
    </section>
  </div>
</template>

<script setup>
import { useDisplay } from 'vuetify'
const { mdAndDown } = useDisplay()
</script>

<script>
import * as yup from 'yup'
import { captureErrorYup } from '../../utils/captureErrorYup'
import axios from 'axios'
import TypeIt from 'typeit'

export default {
  data() {
    return {
      email: '',
      password: '',
      errors: {}
    }
  },
  methods: {
    handleLogin() {
      const schema = yup.object().shape({
        email: yup
          .string()
          .email('Forneça um endereço de email válido')
          .required('E-mail é obrigatório.'),
        password: yup.string().required('Senha é obrigatória.')
      })
      try {
        schema.validateSync(
          {
            email: this.email,
            password: this.password
          },
          { abortEarly: false }
        )

        this.errors = {}

        axios
          .post('http://localhost:3000/sessions', {
            email: this.email,
            password: this.password
          })
          .then((response) => {
            const loggedUser = {
              name: response.data.name,
              token: response.data.token
            }
            localStorage.setItem('logged_user', JSON.stringify(loggedUser))

            this.$router.push('/')
          })
          .catch((error) => {
            if (error.response) {
              const status = error.response.status
              const responseData = error.response.data

              if (status === 401) {
                if (responseData.message) {
                  alert(responseData.message)
                } else {
                  alert('Email ou senha incorretos, tente novamente.')
                }
              } else if (status === 500) {
                alert('Não foi possível realizar o login. Tente novamente mais tarde.')
              }
            } else {
              alert('Ocorreu um erro. Tente novamente mais tarde.')
            }
          })
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          console.log(error)
          this.errors = captureErrorYup(error)
        }
      }
    },
    typeIt() {
      new TypeIt('.type-it', {
        speed: 150,
        startDelay: 1000,
        waitUntilVisible: true,
        loop: true
      })
        .type('treinos!', { delay: 400 })
        .pause(600)
        .delete(8)
        .type('exercícios!', { delay: 400 })
        .pause(600)
        .delete(11)
        .type('alunos!', { delay: 400 })
        .pause(600)
        .delete(7)
        .type('sua ', { delay: 400 })
        .pause(300)
        .type('academia!', { delay: 400 })
        .pause(1000)
        .delete(12)
        .go()
    }
  },
  mounted() {
    document.querySelector('.type-it').innerHTML = ''
    this.typeIt()
  }
}
</script>

<style scoped>
section,
.container {
  height: 100%;
  width: 100%;
}
section.left {
  background-color: #292929;
  width: 70%;
  overflow: hidden;
}
.background {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.4;
  z-index: -1;
}
.float {
  position: absolute;
  top: 54%;
  left: 35%;
  transform: translate(-50%, -50%);
  color: #fff4d3;
  font-size: 2rem;
  font-weight: bold;
  min-width: 55vh;
  z-index: 1;
}
.type-it {
  font-weight: bold;
  color: #ffc107;
}
section.right {
  width: 30%;
}
.v-form {
  width: 70%;
  gap: 8px;
}
a {
  color: #292929;
  font-weight: bold;
  text-decoration: none;
}
a:hover {
  color: #ffc107;
}
</style>
