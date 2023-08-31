<template>
  <v-form @submit.prevent="handleCreateAccount">
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
      v-model="password"
      label="Senha"
      type="password"
      :error-messages="errors.password"
    ></v-text-field>

    <v-text-field
      v-model="confirmPassword"
      label="Confirme a senha"
      type="password"
      :error-messages="errors.confirmPassword"
    ></v-text-field>

    <v-select
      v-model="selectPlan"
      label="Plano"
      :items="typePlan"
      :error-messages="errors.selectPlan"
    ></v-select>

    <v-btn type="submit">Cadastrar</v-btn>
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
      password: '',
      confirmPassword: '',
      typePlan: [
        { value: 'bronze', title: 'Bronze' },
        { value: 'silver', title: 'Prata' },
        { value: 'gold', title: 'Ouro' }
      ],
      selectPlan: 'bronze',

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
