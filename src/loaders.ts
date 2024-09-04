import { Loader, RedirectError, saneOption } from 'logard';
import { getCountries, getCountry, getCountryDetails } from './service';
import { unique } from './util';

export const countryListLoader = new Loader(getCountries);

export const countryFilterLoader = new Loader(async s => {
  const countries = await countryListLoader.getResult(s);

  const regions = unique(countries.map(c => c.region));
  const region = s.getQueryParam('region', saneOption(regions));

  const subregions = region ? unique(countries.filter(c => c.region === region).map(c => c.subregion).filter(Boolean)) : [];
  const subregion = subregions.length > 0 ? s.getQueryParam('subregion', saneOption(subregions)) : undefined;
  if (!subregion) s.removeQueryParams('subregion');

  return { region, subregion };
});

export const countryDetailLoader = new Loader(async s => {
  const code = s.getPathParam('code');
  const country = code && await getCountryDetails(code);
  if (!country) throw new RedirectError({ name: 'country-list' });
  return country;
});

export const neighboursLoader = new Loader(async s => {
  const country = await countryDetailLoader.getResult(s);
  return Promise.all(country.neighbours.map(getCountry));
});