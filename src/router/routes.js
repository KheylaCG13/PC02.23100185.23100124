const routes = [
  {
    path: '/',
    component: () => import('src/components/auth/LoginForm.vue'),
    children: [],
  },

  // Always leave this as last one,
  // but you can also remove it
  { path: '/digimon', component: () => import('pages/Digimon.vue') },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
