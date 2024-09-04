<template>
  <Breadcrumbs :region="country.region" :subregion="country.subregion"/>

  <h2>{{ country.flag }} &nbsp; {{ country.name }}</h2>

  <h3>Official names</h3>
  <ul>
    <li v-for="name in country.officialNames">{{ name }}</li>
  </ul>

  <h3>Capital</h3>
  <p>{{ country.capital}}</p>

  <h3>Area</h3>
  <p>{{ country.area?.toLocaleString() ?? 0}} km<sup>2</sup></p>

  <h3>Population</h3>
  <p>{{ country.population?.toLocaleString() ?? 0}} humans</p>

  <h3>Languages</h3>
  <ul>
    <li v-for="lang in country.languages">{{ lang }}</li>
  </ul>

  <template v-if="neighbours.length > 0">
    <h3>Neighbouring countries</h3>
    <ul>
      <li v-for="neighbour in neighbours">
        <RouterLink :to="getCountryLink(neighbour)">{{ neighbour.name }}</RouterLink>
      </li>
    </ul>
  </template>
  <h3 v-else>No neighbouring countries</h3>
</template>

<script setup lang="ts">
  import Breadcrumbs from './Breadcrumbs.vue';
  import { Country, CountryDetails } from '../service';
  import { getCountryLink } from '../util';

  defineProps<{
    country: CountryDetails;
    neighbours: Array<Country>;
  }>();
</script>