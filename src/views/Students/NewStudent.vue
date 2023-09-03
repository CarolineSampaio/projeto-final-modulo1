<template>
  <h1><v-icon>mdi-account-multiple</v-icon>Alunos</h1>

  <v-form ref="form" @submit.prevent="createNewStudent">
    <v-text-field
      v-model="name"
      label="Nome completo"
      type="text"
      :error-messages="errors.name"
    ></v-text-field>

    <v-text-field
      v-model="email"
      label="E-mail"
      type="email"
      :error-messages="errors.email"
    ></v-text-field>

    <v-text-field
      v-model="contact"
      label="Contato"
      type="text"
      :error-messages="errors.contact"
    ></v-text-field>

    <v-text-field
      v-model="dateBirth"
      label="Data de Nascimento"
      type="date"
      :error-messages="errors.dateBirth"
      onclick="this.showPicker()"
      onfocus="this.showPicker()"
      onkeydown="return false"
      :max="new Date().toLocaleDateString('pt-br').split('/').reverse().join('-')"
    ></v-text-field>

    <v-text-field
      v-model="cep"
      label="CEP"
      type="text"
      :error-messages="errors.cep"
      maxLength="9"
      v-on:focusout="getAddressInfo()"
      v-on:keyup.enter="getAddressInfo()"
    ></v-text-field>

    <v-text-field
      v-model="street"
      label="Logradouro"
      type="text"
      :error-messages="errors.street"
      :readonly="addressRequested"
    ></v-text-field>

    <v-text-field
      v-model="number"
      label="Número"
      type="text"
      :error-messages="errors.number"
    ></v-text-field>

    <v-text-field
      v-model="neighborhood"
      label="Bairro"
      type="text"
      :error-messages="errors.neighborhood"
      :readonly="addressRequested"
    ></v-text-field>

    <v-text-field
      v-model="city"
      label="Cidade"
      type="text"
      :error-messages="errors.city"
      :readonly="addressRequested"
    ></v-text-field>

    <v-text-field
      v-model="state"
      label="Estado"
      type="text"
      :error-messages="errors.state"
      :readonly="addressRequested"
    ></v-text-field>

    <v-text-field
      v-model="complement"
      label="Complemento"
      type="text"
      :error-messages="errors.complement"
    ></v-text-field>

    <v-btn type="submit">Cadastrar</v-btn>
  </v-form>

  <v-snackbar v-model="snackbarSucess" :timeout="tempoExibicao" color="success" location="top">
    Aluno cadastrado com sucesso!
  </v-snackbar>
  <v-snackbar v-model="snackbarError" :timeout="tempoExibicao" color="red" location="top">
    Erro ao cadastrar aluno!
  </v-snackbar>
</template>

<script>
import * as yup from 'yup'
import { captureErrorYup } from '../../utils/captureErrorYup'
import axios from 'axios'

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
      tempoExibicao: 2000,

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
        .post('http://localhost:3000/students', student)
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
