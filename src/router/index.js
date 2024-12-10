import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Board from '../components/Board.vue'
import Card from '../components/Card.vue'


import NotFound from '../components/NotFound.vue'

//미들웨어
Vue.use(VueRouter)

const router = new VueRouter({
  mode: "history",
  routes : [
    {path: '/', component: Home},
    {path: '/login', component: Login},
    {path: '/board/:boardid', component: Board, children: [
      {path: 'card/:cardid', component: Card}
    ]},
    {path: '*', component: NotFound},
  ]
})

export default router;