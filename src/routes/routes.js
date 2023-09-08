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
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/exercises',
      name: 'Exercises',
      component: Exercises,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requiresGuest: true }
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
      meta: { requiresGuest: true }
    },
    {
      path: '/students/new',
      name: 'NewStudent',
      component: NewStudent,
      meta: { requiresAuth: true }
    },
    {
      path: '/students',
      name: 'StudentManagement',
      component: StudentManagement,
      meta: { requiresAuth: true }
    },
    {
      path: '/training/new/:id',
      name: 'NewTraining',
      component: NewTraining,
      meta: { requiresAuth: true }
    },
    {
      path: '/training/:id',
      name: 'TrainingView',
      component: TrainingView,
      meta: { requiresAuth: true }
    }
  ]
})

routes.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('logged_user')

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (to.path === '/' && !isLoggedIn) {
      next({
        path: '/login'
      })
    } else if (to.path !== '/' && !isLoggedIn) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (isLoggedIn) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default routes
