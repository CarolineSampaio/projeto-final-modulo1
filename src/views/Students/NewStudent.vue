<template>
  <h1><v-icon>mdi-account-multiple</v-icon>Alunos</h1>

  <v-form @submit.prevent="CreateNewStudent">
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
      class=""
    ></v-text-field>

    <v-text-field
      v-model="street"
      label="Logradouro"
      type="text"
      :error-messages="errors.street"
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
    ></v-text-field>

    <v-text-field
      v-model="city"
      label="Cidade"
      type="text"
      :error-messages="errors.city"
    ></v-text-field>

    <v-text-field
      v-model="state"
      label="Estado"
      type="text"
      :error-messages="errors.state"
    ></v-text-field>

    <v-text-field
      v-model="complement"
      label="Complemento"
      type="text"
      :error-messages="errors.complement"
    ></v-text-field>

    <v-btn type="">Cadastrar</v-btn>
  </v-form>
</template>

<script>
import * as yup from 'yup'
import { captureErrorYup } from '../../utils/captureErrorYup'

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

      errors: {}
    }
  },
  methods: {
    CreateNewStudent() {
      const schema = yup.object().shape({
        name: yup.string().required('O nome é obrigatório.'),
        email: yup.string().email('Forneça um e-mail válido.'),
        contact: yup.string().required('Um telefone para contato é obrigatório.'),
        cep: yup.string().required('O CEP é obrigatório.'),
        street: yup.string().required('O logradouro é obrigatório.'),
        number: yup.string().required('O número é obrigatório.'),
        neighborhood: yup.string().required('O bairro é obrigatório.'),
        city: yup.string().required('A cidade é obrigatória.'),
        state: yup.string().required('O estado é obrigatório.'),
        complement: yup.string().required('O complemento é obrigatório.')
      })
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
        }
      }
    }
  }
}
</script>
