import { createRouter, createWebHistory } from 'vue-router';
import PokeList from '../views/PokeList.vue';
import PokeInfos from '../views/PokeInfos.vue';

const routes = [
  {
    path: '/',
    name: 'PokeList',
    component: PokeList,
  },
  {
    path: '/:id',
    name: 'PokeInfos',
    component: PokeInfos,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
