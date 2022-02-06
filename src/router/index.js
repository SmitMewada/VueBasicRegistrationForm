import { createRouter, createWebHashHistory } from 'vue-router'
import StudenFormView from "../views/StudentFormView.vue";
import StudentsView from "../views/StudentsView.vue"

const routes = [
  {
    path: '/',
    name: 'StudenFormView',
    component: StudenFormView
  },
  {
    path: "/:id",
    name: "UpdateStudent",
    component: StudenFormView
  },
  {
    path: "/students",
    name: "students-view",
    component: StudentsView
  },
 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,

})

export default router
