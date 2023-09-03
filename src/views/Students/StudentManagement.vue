<template>
  <h1><v-icon>mdi-account-multiple</v-icon>Alunos</h1>
  <router-link to="/students/new"><v-btn>novo</v-btn></router-link>

  <v-form class="d-flex">
    <v-text-field v-model="search" label="Digite o nome do aluno" type="text"></v-text-field>
    <v-btn>Buscar</v-btn>
  </v-form>

  <v-table>
    <thead>
      <tr>
        <th>Nome</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Nome aluno</td>
        <td>
          <router-link to="/training/new"><v-btn>Montar treino</v-btn></router-link>
          <router-link to="/training/:id"><v-btn>Ver treino</v-btn></router-link>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  data() {
    return {
      search: ''
    }
  }
}
</script>
