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
          import(/* webpackChunkName: "client" */ "../views/Clients/Main.vue"),
        children: [
          {
            path: "",
            name: "homeClients",
            component: import(
              /* webpackChunkName: "client" */ "../views/Clients/Home/Main.vue"
            ),
          },
          {
            path: "adicionar/:id",
            name: "formClients",
            component: () =>
              import(
                /* webpackChunkName: "client" */ "../views/Clients/Form/Main.vue"
              ),
          },
        ],
      },
      {
        path: "/produtos",
        name: "products",
        component: () =>
          import(
            /* webpackChunkName: "product" */ "../views/Products/Main.vue"
          ),
        children: [
          {
            path: "",
            name: "homeProducts",
            component: () =>
              import(
                /* webpackChunkName: "product" */ "../views/Products/Home/Main.vue"
              ),
          },
          {
            path: "adicionar/:id",
            name: "formProducts",
            component: () =>
              import(
                /* webpackChunkName: "product" */ "../views/Products/Form/Main.vue"
              ),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
