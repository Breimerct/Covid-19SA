import Cuidate from 'pages/Cuidate.vue'

const routes = [{
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
      path: '',
      component: () => import('pages/Home.vue')
    }]
  },
  {
    path: '/Cuidate',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
      path: '',
      component: Cuidate
    }]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
