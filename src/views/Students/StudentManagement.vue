<template>
  <h1><v-icon>mdi-account-multiple</v-icon>Alunos</h1>
  <router-link to="/students/new"><v-btn>novo</v-btn></router-link>

  <v-form class="d-flex">
    <v-text-field
      v-model="search"
      label="Digite o nome do aluno"
      type="text"
      @input="searchStudents"
    ></v-text-field>
  </v-form>

  <v-table>
    <thead>
      <tr>
        <th>Nome</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="student in filteredStudents" :key="student.id">
        <td>{{ student.name }}</td>
        <td>
          <router-link :to="`/training/new/${student.id}`">
            <v-btn>Montar treino</v-btn>
          </router-link>
          <router-link :to="`/training/${student.id}`">
            <v-btn>Ver treino</v-btn>
          </router-link>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      search: '',
      students: [],
      filteredStudents: []
    }
  },
  mounted() {
    this.getStudents()
  },
  methods: {
    getStudents() {
      axios.get('http://localhost:3000/students').then(({ data }) => {
        this.students = this.filteredStudents = data.students
      })
    },
    searchStudents() {
      this.filteredStudents = this.students.filter((student) => {
        return student.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  }
}
</script>
