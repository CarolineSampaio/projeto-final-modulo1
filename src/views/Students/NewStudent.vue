<template>
  <div class="container" :style="mdAndDown ? 'padding-left: 5%' : 'padding-left: 20%'">
    <div class="d-flex align-center" :style="smAndDown ? 'justify-content:center;' : ''">
      <h1 class="py-4 py-md-12 font-weight-medium">Cadastro Aluno</h1>
      <v-icon size="x-large" class="pl-10" color="amber">mdi-account-outline</v-icon>
    </div>
    <div class="cardImage">
      <div class="cardContent" :style="smAndDown ? 'flex-direction: column;  padding:8%' : ''">
        <v-form ref="form" @submit.prevent="createNewStudent">
          <v-row>
            <v-col cols="12" md="6" class="pt-sm-2 pb-sm-2">
              <v-text-field
                v-model="name"
                label="Nome completo"
                type="text"
                variant="outlined"
                :error-messages="errors.name"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pt-sm-2 pb-sm-2">
              <v-text-field
                v-model="email"
                label="E-mail"
                type="email"
                variant="outlined"
                :error-messages="errors.email"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pt-sm-2 pb-sm-2">
              <v-text-field
                v-model="contact"
                label="Telefone para contato"
                type="text"
                variant="outlined"
                :error-messages="errors.contact"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pt-sm-2 pb-sm-2">
              <v-text-field
                v-model="dateBirth"
                label="Data de Nascimento"
                type="date"
                variant="outlined"
                :error-messages="errors.dateBirth"
                onclick="this.showPicker()"
                onfocus="this.showPicker()"
                onkeydown="return false"
                :max="new Date().toLocaleDateString('pt-br').split('/').reverse().join('-')"
              >
              </v-text-field>
            </v-col>

            <v-divider class="mb-4"></v-divider>

            <v-col cols="12" sm="3" md="6" class="pt-sm-2 pb-sm-2">
              <v-text-field
                v-model="cep"
                label="CEP"
                type="text"
                variant="outlined"
                :error-messages="errors.cep"
                maxLength="9"
                v-on:focusout="getAddressInfo()"
                v-on:keyup.enter="getAddressInfo()"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="9" md="6" class="pt-sm-2 pb-sm-2">
              <v-text-field
                v-model="street"
                label="Logradouro"
                type="text"
                variant="outlined"
                :error-messages="errors.street"
                :readonly="addressRequested"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="pt-sm-2 pb-sm-2">
              <v-text-field
                v-model="number"
                label="Número"
                type="text"
                variant="outlined"
                :error-messages="errors.number"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="pt-sm-2 pb-sm-2">
              <v-text-field
                v-model="neighborhood"
                label="Bairro"
                type="text"
                variant="outlined"
                :error-messages="errors.neighborhood"
                :readonly="addressRequested"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="pt-sm-2 pb-sm-2">
              <v-text-field
                v-model="complement"
                label="Complemento"
                type="text"
                variant="outlined"
                :error-messages="errors.complement"
              >
              </v-text-field>
            </v-col>

            <v-col cols="8" sm="3" class="pt-sm-2 pb-sm-2">
              <v-text-field
                v-model="city"
                label="Cidade"
                type="text"
                variant="outlined"
                :error-messages="errors.city"
                :readonly="addressRequested"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4" sm="3" class="pt-sm-2 pb-sm-2">
              <v-text-field
                v-model="state"
                label="Estado"
                type="text"
                variant="outlined"
                :error-messages="errors.state"
                :readonly="addressRequested"
              >
              </v-text-field>
            </v-col>

            <v-col class="d-flex justify-center pt-sm-6 pb-sm-0">
              <v-btn
                type="submit"
                variant="elevated"
                color="grey-darken-4 text-amber"
                class="font-weight-bold"
                :ripple="false"
                size="large"
              >
                Cadastrar
              </v-btn>
            </v-col>
          </v-row>
        </v-form>

        <v-snackbar v-model="snackbarSucess" :timeout="duration" color="success" location="top">
          Aluno cadastrado com sucesso!
        </v-snackbar>
        <v-snackbar v-model="snackbarError" :timeout="duration" color="red" location="top">
          Erro ao cadastrar aluno!
        </v-snackbar>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDisplay } from 'vuetify'
const { smAndDown, mdAndDown } = useDisplay()
</script>

<script>
import * as yup from 'yup'
import { captureErrorYup } from '../../utils/captureErrorYup'
import axios from 'axios'
import { getToken } from '../../utils/auth'
import { API_URL } from '../../utils/constants'

const schema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório.'),
  email: yup.string().optional().email('Forneça um e-mail válido.'),
  contact: yup.string().required('Um telefone para contato é obrigatório.'),
  cep: yup.string().min(8, 'O CEP deve conter 8 dígitos.').required('O CEP é obrigatório.'),
  street: yup.string().required('O logradouro é obrigatório.'),
  number: yup.string().required('O número é obrigatório.'),
  neighborhood: yup.string().required('O bairro é obrigatório.'),
  city: yup.string().required('A cidade é obrigatória.'),
  state: yup.string().required('O estado é obrigatório.'),
  complement: yup.string().optional()
})

export default {
  data() {
    return {
      name: '',
      email: '',
      contact: '',
      dateBirth: '',
      formatedDateBirth: '',
      cep: '',
      street: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',
      complement: '',
      addressRequested: false,
      snackbarSucess: false,
      snackbarError: false,
      duration: 2000,
      token: getToken(),

      errors: {}
    }
  },
  methods: {
    validateSync() {
      this.errors = {}
      try {
        schema.validateSync(
          {
            name: this.name,
            email: this.email,
            contact: this.contact,
            cep: this.cep,
            street: this.street,
            number: this.number,
            neighborhood: this.neighborhood,
            city: this.city,
            state: this.state,
            complement: this.complement
          },
          { abortEarly: false }
        )
        this.formatedDateBirth = this.dateBirth.split('-').reverse().join('/')
        this.errors = {}
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          console.log(error)
          this.errors = captureErrorYup(error)
          return false
        }
      }
      return true
    },

    createNewStudent() {
      if (this.validateSync() === false) return

      const student = {
        name: this.name,
        email: this.email,
        contact: this.contact,
        date_birth: this.formatedDateBirth,
        cep: this.cep,
        street: this.street,
        number: this.number,
        neighborhood: this.neighborhood,
        city: this.city,
        province: this.state,
        complement: this.complement
      }

      axios
        .post(`${API_URL}/students`, student, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        .then((response) => {
          console.log(response.data)
          this.snackbarSucess = true
          this.$refs.form.reset()
        })
        .catch((error) => {
          console.log(error)
          this.snackbarError = true
        })
    },
    getAddressInfo() {
      const cep = this.cep.replace('-', '')
      if (cep.length === 8) {
        axios
          .get(`https://viacep.com.br/ws/${cep}/json/`)
          .then(({ data }) => {
            if (data.erro) return
            this.street = data.logradouro
            this.neighborhood = data.bairro
            this.city = data.localidade
            this.state = data.uf
            this.addressRequested = true
            this.validateSync()
          })
          .catch((error) => {
            alert(`Erro ao consultar CEP: ${cep}`, error)
          })
      }
    }
  }
}
</script>

<style scoped>
.cardContent {
  background-color: rgba(255, 255, 255, 0.6);
  box-shadow:
    inset 1px 1px 0px 0px var(--v-shadow-key-penumbra-opacity, rgba(240, 240, 240, 0.8)),
    1px 1px 0px var(--v-shadow-key-penumbra-opacity, rgba(220, 220, 220, 0.8));
}
</style>
