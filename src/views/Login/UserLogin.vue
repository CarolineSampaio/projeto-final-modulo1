<template>
  <v-form @submit.prevent="handleLogin">
    <v-text-field
      v-model="email"
      label="E-mail"
      type="email"
      :error-messages="errors.email"
    ></v-text-field>
    <v-text-field
      v-model="password"
      label="Senha"
      type="password"
      :error-messages="errors.password"
    ></v-text-field>
    <v-btn type="submit">Logar</v-btn>
  </v-form>

  <div>
    <p>Ainda não tem conta?<router-link to="/signup"> Cadastre-se</router-link></p>
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
            console.log(error)
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
