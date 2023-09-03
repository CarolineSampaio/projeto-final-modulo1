import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../views/Dashboard/DashboardPage.vue'
import Exercises from '../views/Exercises/ExercisesPage.vue'
import Login from '../views/Login/UserLogin.vue'
import SignUp from '../views/SignUp/UserSignUp.vue'
import NewStudent from '../views/Students/NewStudent.vue'
import StudentManagement from '../views/Students/StudentManagement.vue'
import NewTraining from '../views/Training/NewTraining.vue'
import TrainingView from '../views/Training/TrainingView.vue'

const routes = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/exercises',
      name: 'Exercises',
      component: Exercises
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/students/new',
      name: 'NewStudent',
      component: NewStudent
    },
    {
      path: '/students',
      name: 'StudentManagement',
      component: StudentManagement
    },
    {
      path: '/training/new/:id',
      name: 'NewTraining',
      component: NewTraining
    },
    {
      path: '/training/:id',
      name: 'TrainingView',
      component: TrainingView
    }
  ]
})

export default routes
