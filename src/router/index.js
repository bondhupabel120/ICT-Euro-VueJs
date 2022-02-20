import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import App from '../views/Layout.vue'
import DashboardLayout from "@/components/Backend/Layout/Layout";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    meta: { title: "Home Layout"},
    component: App,
    children: [
      {
        meta: { title: "Home"},
        path: "/",
        component: Home,
      },
      {
        path: '/login',
        name: 'LoginPage',
        component: () => import('../views/loginPage.vue')
      },

    ]
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardLayout,
    meta: {
      requiresAuth: true,
      is_admin: true,
    },
    children: [
      {
        meta: { title: "PdfResources", requiresAuth: true, is_admin: true },
        path: "/dashboard/pdfresources",
        name: "pdfresourceList",
        component: () => import('../views/Backend/Pdfresource/Index.vue')
      },
      {
        meta: { title: "Add Pdfresource", requiresAuth: true, is_admin: true },
        path: "/dashboard/add_pdfresource",
        name: "AddPdfresource",
        component: () => import('../views/Backend/Pdfresource/Add.vue')
      },

      {
        meta: { title: "SnippetResources", requiresAuth: true, is_admin: true },
        path: "/dashboard/snippetresources",
        name: "SnippetResourceList",
        component: () => import('../views/Backend/Snippetresource/Index.vue')
      },
      {
        meta: { title: "Add Snippetresource", requiresAuth: true, is_admin: true },
        path: "/dashboard/add_snippetresource",
        name: "AddSnippetresource",
        component: () => import('../views/Backend/Snippetresource/Add.vue')
      },

      {
        meta: { title: "LinkResources", requiresAuth: true, is_admin: true },
        path: "/dashboard/linkresources",
        name: "LinkResourceList",
        component: () => import('../views/Backend/Linkresource/Index.vue')
      },
      {
        meta: { title: "Add Snippetresource", requiresAuth: true, is_admin: true },
        path: "/dashboard/add_linkresource",
        name: "AddLinkresource",
        component: () => import('../views/Backend/Linkresource/Add.vue')
      },

    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("auth_token") == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath },
      });
    } else {
      let user = JSON.parse(localStorage.getItem("user_data"));
      if (to.matched.some((record) => record.meta.is_admin)) {
        if (user.user_type == 1) { //admin check
          next();
        } else {
          next({ path: "/" });
        }
      } else {
        next();
      }
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (localStorage.getItem("auth_token") == null) {
      next();
    } else {
      next({ path: "/" });
    }
  } else {
    next();
  }
});

export default router
