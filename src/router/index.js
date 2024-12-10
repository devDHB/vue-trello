import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import Board from "../components/Board.vue";
import Card from "../components/Card.vue";

import NotFound from "../components/NotFound.vue";

//미들웨어
Vue.use(VueRouter);

const requireAuth = (to, from, next) => {
  const isAuth = localStorage.getItem("token");
  // login 완료 후에 리다이렉트하는 경로 지정
  //to.path 가 query 문자열이기 때문에 인코딩 해야함
  const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`;
  isAuth ? next() : next(loginPath);
};

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: Home, beforeEnter: requireAuth },
    { path: "/login", component: Login },
    {
      path: "/board/:boardid",
      component: Board,
      beforeEnter: requireAuth,
      children: [
        { path: "card/:cardid", component: Card, beforeEnter: requireAuth },
      ],
    },
    { path: "*", component: NotFound },
  ],
});

export default router;
