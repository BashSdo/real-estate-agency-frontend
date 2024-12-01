import { createRouter, createWebHistory } from 'vue-router/auto';
import { setupLayouts } from 'virtual:generated-layouts';

const routes = setupLayouts([
  {
    path: '/',
    component: () => import('@/pages/index.vue'),
  },
  {
    path: '/contract/:id',
    component: () => import('@/pages/contract.vue'),
  },
  {
    path: '/contracts',
    component: () => import('@/pages/contracts.vue'),
  },
  {
    path: '/placement/:id',
    component: () => import('@/pages/placement.vue'),
  },
  {
    path: '/placements',
    component: () => import('@/pages/placements.vue'),
  },
  {
    path: '/realty/:id',
    component: () => import('@/pages/realty.vue'),
  },
  {
    path: '/realties',
    component: () => import('@/pages/realties.vue'),
  },
  {
    path: '/report/salary',
    component: () => import('@/pages/report/salary.vue'),
  },
  {
    path: '/reports',
    component: () => import('@/pages/reports.vue'),
  },
  {
    path: '/user',
    component: () => import('@/pages/user.vue'),
  },
  {
    path: '/user/:id',
    component: () => import('@/pages/user.vue'),
  },
  {
    path: '/users',
    component: () => import('@/pages/users.vue'),
  },
]);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error');
      localStorage.setItem('vuetify:dynamic-reload', 'true');
      location.assign(to.fullPath);
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload');
});

export default router;
