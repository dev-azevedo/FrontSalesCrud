import { createRouter, createWebHistory } from "vue-router";
import beforeEach from "./beforeEach";

const routes = [
  {
    path: "/",
    name: "layout",
    component: () =>
      import(/* webpackChunkName: "layout" */ "@/views/Layout/Main.vue"),
    children: [
      {
        path: "/",
        name: "dashboard",
        component: () => import("@/views/Dashboard/Main.vue"),
      },
      {
        path: "/vendas",
        name: "sales",
        component: () =>
          import(/* webpackChunkName: "sales" */ "@/views/Sales/Main.vue"),
        children: [
          {
            path: "",
            name: "homeSales",
            component: () => import(
              /* webpackChunkName: "sales" */ "@/views/Sales/Home/Main.vue"
            ),
          },
          {
            path: "adicionar/:id",
            name: "formSales",
            component: () =>
              import(
                /* webpackChunkName: "sales" */ "@/views/Sales/Form/Main.vue"
              ),
          },
        ],
      },
      {
        path: "/clientes",
        name: "clients",
        component: () =>
          import(/* webpackChunkName: "client" */ "@/views/Clients/Main.vue"),
        children: [
          {
            path: "",
            name: "homeClients",
            component: () => import(
              /* webpackChunkName: "client" */ "@/views/Clients/Home/Main.vue"
            ),
          },
          {
            path: "adicionar/:id",
            name: "formClients",
            component: () =>
              import(
                /* webpackChunkName: "client" */ "@/views/Clients/Form/Main.vue"
              ),
          },
        ],
      },
      {
        path: "/produtos",
        name: "products",
        component: () =>
          import(/* webpackChunkName: "product" */ "@/views/Products/Main.vue"),
        children: [
          {
            path: "",
            name: "homeProducts",
            component: () =>
              import(
                /* webpackChunkName: "product" */ "@/views/Products/Home/Main.vue"
              ),
          },
          {
            path: "adicionar/:id",
            name: "formProducts",
            component: () =>
              import(
                /* webpackChunkName: "product" */ "@/views/Products/Form/Main.vue"
              ),
          },
        ],
      },
     
    ],
  },
  {
    path: "/inicio",
    name: "init",
    component: () => import(/* webpackChunkName: "init" */ "@/views/Init/Main.vue"),
  }
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(beforeEach);

export default router;
