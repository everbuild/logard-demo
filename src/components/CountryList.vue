<template>
  <Breadcrumbs :region="selectedRegion?.name" :subregion="selectedSubregion?.name"/>

  <ul v-if="visibleCountries">
    <li v-for="country in visibleCountries">
      <RouterLink :to="getCountryLink(country)">{{ country.name }}</RouterLink>
    </li>
  </ul>

  <ul v-else-if="selectedRegion">
    <li v-for="subregion in selectedRegion.subregions">
      <RouterLink :to="getCountryListLink(selectedRegion.name, subregion.name)">{{ subregion.name }}</RouterLink>
    </li>
  </ul>

  <ul v-else>
    <li v-for="region in tree">
      <RouterLink :to="getCountryListLink(region.name)">{{ region.name }}</RouterLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import Breadcrumbs from './Breadcrumbs.vue';
  import { computed } from 'vue';
  import { Country } from '../service';
  import { getCountryLink, getCountryListLink, unique } from '../util';

  const props = defineProps<{
    countries: Array<Country>;
    filters: { region?: string; subregion?: string }
  }>();

  const tree = computed(() => {
    return unique(props.countries.map(c => c.region)).map(regName => {
      const regCountries = props.countries.filter(c => c.region === regName);

      const subregs = unique(regCountries.map(c => c.subregion).filter(Boolean)).map(subName => {
        const subCountries = regCountries.filter(c => c.subregion === subName);
        return {
          name: subName,
          countries: subCountries,
        };
      });

      return {
        name: regName,
        subregions: subregs,
        countries: regCountries,
      };
    });
  });

  const selectedRegion = computed(() => tree.value.find(r => r.name === props.filters.region));

  const selectedSubregion = computed(() => selectedRegion.value?.subregions.find(sr => sr.name === props.filters.subregion));

  const visibleCountries = computed(() => {
    if (selectedSubregion.value) return selectedSubregion.value.countries;
    if (selectedRegion.value?.subregions.length === 0) return selectedRegion.value.countries;
  });
</script>