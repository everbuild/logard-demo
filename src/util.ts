import { Country } from './service';

export function getCountryListLink(region?: string, subregion?: string) {
  return { name: 'country-list', query: { region, subregion } };
}

export function getCountryLink(country: Country) {
  return { name: 'country-details', params: { code: country.code } };
}

export function unique<T = any>(items: Iterable<T>): Array<T> {
  return [...new Set(items)];
}
