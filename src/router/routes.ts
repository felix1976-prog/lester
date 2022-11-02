import { RouteRecordRaw } from 'vue-router';
import { Pinia } from 'pinia';
import { discard } from 'src/utils';

// const routes: RouteRecordRaw[] = [
//   {
//     path: '/',
//     component: () => import('layouts/HomeLayout.vue'),
//     children: [
//       { path: '', component: () => import('pages/IndexPage.vue') },
//       // { path: 'login', component: () => import('pages/IndxPage.vue') },
//     ],
//   },

//   // Always leave this as last one,
//   // but you can also remove it
//   {
//     path: '/:catchAll(.*)*',
//     component: () => import('pages/ErrorNotFound.vue'),
//   },
// ];

// export default routes;

export default function ({ store }: { store: Pinia }) {
  discard({ store });
  const routes: RouteRecordRaw[] = [
    {
      path: '/',
      component: () => import('layouts/HomeLayout.vue'),
      children: [
        { path: '', component: () => import('pages/IndexPage.vue') },
        // { path: 'login', component: () => import('pages/IndxPage.vue') },
      ],
    },
    {
      path: '/home',
      component: () => import('layouts/MainLayout.vue'),
      children: [
        { path: '', component: () => import('pages/DashboardPage.vue') },
        // { path: 'login', component: () => import('pages/IndxPage.vue') },
      ],
    },

    // Always leave this as last one,
    // but you can also remove it
    {
      path: '/:catchAll(.*)*',
      component: () => import('pages/ErrorNotFound.vue'),
    },
  ];
  return routes;
}
