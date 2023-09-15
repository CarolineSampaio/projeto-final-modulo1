<template>
  <div class="container" :style="mdAndDown ? 'padding-left: 5%' : 'padding-left: 20%'">
    <div class="d-flex align-center" :style="smAndDown ? 'justify-content:center;' : ''">
      <h1 class="py-4 py-md-12 font-weight-medium">Alunos</h1>
      <v-icon size="x-large" class="pl-10" color="amber">mdi-account-group-outline</v-icon>
    </div>

    <div class="cardImage">
      <div class="cardContent" :style="smAndDown ? 'flex-direction: column;  padding:8%' : ''">
        <router-link class="d-flex justify-end" to="/students/new">
          <v-btn
            variant="elevated"
            color="grey-darken-4 text-amber"
            class="font-weight-bold px-md-10"
            height="45px"
            :ripple="false"
            :style="smAndDown ? 'width:100%; margin-bottom:8%' : 'margin-bottom:4%'"
          >
            Cadastrar Aluno
          </v-btn>
        </router-link>

        <v-form class="d-flex">
          <v-text-field
            v-model="search"
            label="Pesquisar alunos"
            type="text"
            variant="outlined"
            prepend-inner-icon="mdi-magnify"
            @input="searchStudents"
          >
          </v-text-field>
        </v-form>

        <v-table class="mt-md-3 mt-lg-6">
          <thead>
            <tr>
              <th class="font-weight-bold text-grey-darken-4">Nome</th>
              <th class="font-weight-bold text-grey-darken-4 d-flex justify-center align-center">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="student in filteredStudents" :key="student.id">
              <td v-html="highlightSearch(student.name)" :style="xs ? 'height: auto' : ''"></td>
              <td
                :style="xs ? 'flex-direction:column; height: auto;' : ''"
                class="d-flex justify-center align-center"
              >
                <router-link :to="`/training/new/${student.id}`" :style="xs ? 'width:100%' : ''">
                  <v-btn
                    variant="elevated"
                    color="grey-darken-4 text-amber"
                    class="font-weight-bold px-1 px-sm-2 px-md-10 mr-sm-1 mr-md-4"
                    :ripple="false"
                    :style="xs ? 'width:100%; margin: 10px 0px' : ''"
                  >
                    Cadastrar treino
                  </v-btn>
                </router-link>

                <router-link
                  :to="`/training/${student.id}`"
                  :style="xs ? 'display:flex; width:100%' : ''"
                >
                  <v-btn
                    variant="elevated"
                    color="amber text-dark-grey-4"
                    class="font-weight-bold px-1 px-sm-2 px-md-10 ml-sm-1 ml-md-4"
                    :ripple="false"
                    :style="xs ? 'width:100%; margin-bottom: 10px' : ''"
                  >
                    Visualizar treino
                  </v-btn>
                </router-link>
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDisplay } from 'vuetify'
const { xs, smAndDown, mdAndDown } = useDisplay()
</script>

<script>
import axios from 'axios'
import { getToken } from '../../utils/auth'
import { API_URL } from '../../utils/constants'

export default {
  data() {
    return {
      search: '',
      students: [],
      filteredStudents: [],
      token: getToken()
    }
  },
  mounted() {
    this.getStudents()
  },
  methods: {
    getStudents() {
      axios
        .get(`${API_URL}/students`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        .then(({ data }) => {
          this.students = this.filteredStudents = data.students
        })
    },
    searchStudents() {
      this.filteredStudents = this.students.filter((student) => {
        return student.name.toLowerCase().includes(this.search.toLowerCase().trim())
      })
    },
    highlightSearch(str) {
      if (!str || !this.search) return str
      const highlight = this.search.trim()
      return str.replace(
        new RegExp(`(.)?(${highlight})(.)?`, 'ig'),
        '$1<b style="background:#FFCA27; padding:2px; border-radius:2px;">$2</b>$3'
      )
    }
  }
}
</script>
