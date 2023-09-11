<template>
  <div class="d-flex ma-0 pa-0 container">
    <section class="left">
      <img
        src="../../assets/bg_login.jpg"
        alt="imagem com barra e peso academia no chão."
        class="background"
      />
    </section>
    <section class="d-flex flex-column justify-center align-center right">
      <img
        src="../../assets/gofit_logo.svg"
        alt="logo do sistema go!fit, no o possui o desenho de uma anilha."
        class="mb-10 logo"
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
          color="amber text-white"
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

<script>
import * as yup from 'yup'
import { captureErrorYup } from '../../utils/captureErrorYup'
import axios from 'axios'

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
    }
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
}
.background {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.4;
}

section.right {
  width: 30%;
}
.v-form {
  width: 70%;
  gap: 8px;
}
.logo {
  width: 60%;
}
a {
  color: #ffb300;
  font-weight: bold;
  text-decoration: none;
}
</style>
