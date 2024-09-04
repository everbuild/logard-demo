<template>
  <nav class="breadcrumbs">
    <ul>
      <li v-if="!region">
        Select a region
      </li>
      <li v-if="region">
        <RouterLink :to="getCountryListLink()">🌎</RouterLink>
      </li>
      <li v-if="region">
        <RouterLink :to="getCountryListLink(region)">{{ region }}</RouterLink>
      </li>
      <li v-if="region && subregion">
        <RouterLink :to="getCountryListLink(region, subregion)">{{ subregion }}</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
  import { getCountryListLink } from '../util';

  defineProps<{
    region?: string;
    subregion?: string;
  }>();
</script>

<style scoped lang="scss">
  .breadcrumbs {
    font-size: 1.5rem;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    li {
      display: inline;

      &:not(:last-child)::after {
        content: '/';
        margin: 0 .5em;
      }
    }
  }
</style>