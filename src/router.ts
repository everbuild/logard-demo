import { installRouteLoader } from 'logard/dist/vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import { countryDetailLoader, countryFilterLoader, countryListLoader, neighboursLoader } from './loaders';
import CountryDetails from './components/CountryDetails.vue';
import CountryList from './components/CountryList.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'country-list',
      path: '/countries',
      component: CountryList,
      props: {
        countries: countryListLoader,
        filters: countryFilterLoader,
      },
    },
    {
      name: 'country-details',
      path: '/country/:code',
      component: CountryDetails,
      props: {
        country: countryDetailLoader,
        neighbours: neighboursLoader,
      },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'country-list' },
    },
  ],
});

installRouteLoader(router, { debug: true });

export default router;