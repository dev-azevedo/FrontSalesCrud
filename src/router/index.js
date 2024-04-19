import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "layout",
    component: () =>
      import(/* webpackChunkName: "layout" */ "@/views/Layout/Main.vue"),
    children: [
      {
        path: "/",
        name: "sales",
        component: () =>
          import(/* webpackChunkName: "sales" */ "../views/Sales/Main.vue"),
      },
      {
        path: "/clientes",
        name: "clients",
        component: () =>
          import(/* webpackChunkName: "clients" */ "../views/Clients/Main.vue"),
      },
      {
        path: "/produtos",
        name: "products",
        component: () =>
          import(
            /* webpackChunkName: "products" */ "../views/Products/Main.vue"
          ),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
