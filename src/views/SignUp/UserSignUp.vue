<template>
  <div class="d-flex ma-0 pa-0 container">
    <section class="left" :style="mdAndDown ? 'display:none' : ''">
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
        class="mb-2 mb-lg-10"
        :style="mdAndDown ? 'width: 50%' : 'width: 25%'"
      />

      <p class="text-h6 text-md-h5 text-grey-darken-1 mb-5">Crie sua conta!</p>
      <v-form
        @submit.prevent="handleCreateAccount"
        class="d-flex flex-column"
        :style="mdAndDown ? 'width: 85%; gap: 8px' : 'width: 50%; gap: 16px'"
      >
        <v-text-field
          v-model="name"
          label="Nome completo"
          type="text"
          :error-messages="errors.name"
          variant="outlined"
        ></v-text-field>

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

        <v-text-field
          v-model="confirmPassword"
          label="Confirme a senha"
          type="password"
          :error-messages="errors.confirmPassword"
          variant="outlined"
        ></v-text-field>

        <v-select
          v-model="selectPlan"
          label="Plano"
          :items="typePlan"
          :error-messages="errors.selectPlan"
          variant="outlined"
        ></v-select>

        <v-btn
          type="submit"
          color="amber text-grey-darken-3"
          class="font-weight-bold"
          size="large"
          variant="flat"
        >
          Cadastrar
        </v-btn>
      </v-form>
      <p class="text-body-1 text-grey-darken-1 mt-2 px-5 text-center">
        Ao se inscrever, você concorda com os nossos termos de uso.
      </p>

      <p class="mt-2"><router-link to="/login">Já tem uma conta?</router-link></p>
      <div>
        <v-snackbar v-model="snackbarSuccess" :timeout="duration" color="success" location="top">
          Cadastro realizado com sucesso!
        </v-snackbar>
        <v-snackbar v-model="snackbarError" :timeout="duration" color="red-darken-2" location="top">
          {{ errorMessage }}
        </v-snackbar>
      </div>
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
import { API_URL } from '../../utils/constants'

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      typePlan: [
        { value: 'bronze', title: 'Bronze' },
        { value: 'silver', title: 'Prata' },
        { value: 'gold', title: 'Ouro' }
      ],
      selectPlan: 'bronze',
      snackbarSuccess: false,
      snackbarError: false,
      errorMessage: '',
      duration: 3000,

      errors: {}
    }
  },
  methods: {
    handleCreateAccount() {
      const schema = yup.object().shape({
        name: yup
          .string()
          .min(6, 'Seu nome completo deve possuir no mínimo 6 caracteres')
          .required('Digite seu nome completo.'),
        email: yup
          .string()
          .required('Digite seu e-mail.')
          .email('Forneça um endereço de email válido.'),
        password: yup
          .string()
          .min(8, 'A senha deve possuir no mínimo 8 caracteres')
          .max(20, 'Limite excedido, a senha deve ter entre 8-20 caracteres.')
          .required('Digite sua senha.'),
        confirmPassword: yup
          .string()
          .required('Confirme sua senha.')
          .oneOf([yup.ref('password')], 'As senhas devem ser identicas.'),
        selectPlan: yup.string().required('Selecione um plano.')
      })

      try {
        schema.validateSync(
          {
            name: this.name,
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword,
            selectPlan: this.selectPlan
          },
          { abortEarly: false }
        )
        this.errors = {}

        axios
          .post(`${API_URL}/users`, {
            name: this.name,
            email: this.email,
            password: this.password,
            type_plan: this.selectPlan
          })
          .then(() => {
            this.snackbarSuccess = true
            setTimeout(() => {
              this.$router.push('/login')
            }, this.duration)
          })
          .catch((error) => {
            console.log(error)
            if (error.response?.data?.message) {
              this.errorMessage = error.response.data.message
            } else {
              this.snackbarError = true
              this.errorMessage = 'Erro ao cadastrar, tente novamente.'
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
.container {
  display: flex;
  flex-direction: row;
  height: 100%;
}
.background {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.4;
}
section.left {
  flex: 70%;
  height: 100%;
  background-color: #292929;
  overflow: hidden;
  animation: slideOut 1s ease;
  animation-fill-mode: forwards;
}

section.right {
  height: 100%;
  flex: 30%;
  animation: slide 1s ease;
  animation-fill-mode: forwards;
}

@keyframes slide {
  0% {
    flex: 30%;
  }
  100% {
    flex: 60%;
  }
}

@keyframes slideOut {
  0% {
    flex: 70%;
  }
  100% {
    flex: 40%;
  }
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
