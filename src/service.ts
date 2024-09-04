import { unique } from './util';

export type CountryCode = string

export interface Country {
  name: string;
  region: string;
  subregion: string;
  code: CountryCode;
}

export interface CountryDetails extends Country {
  officialNames: Array<string>;
  region: string;
  subregion: string;
  capital: string;
  languages: Array<Record<string, string>>;
  neighbours: Array<CountryCode>;
  area: number;
  flag: string;
  population: number;
}

export async function getCountries(): Promise<Array<Country>> {
  const data = await get('all?fields=name,region,subregion,cca3');
  return data.map((c: any) => ({
    name: c.name.common,
    region: c.region,
    subregion: c.subregion,
    code: c.cca3,
  }));
}

export async function getCountry(code: CountryCode): Promise<Country> {
  const c = await get(`alpha/${code}?fields=name,region,subregion,cca3`);
  return {
    name: c.name.common,
    region: c.region,
    subregion: c.subregion,
    code: c.cca3,
  };
}

export async function getCountryDetails(code: CountryCode): Promise<CountryDetails | null> {
  const data = await get(`alpha/${code}`);
  const c = data[0];
  if (!c) return null;
  return {
    name: c.name?.common,
    code: c.cca3,
    officialNames: unique([c.name.official, ...Object.values(c.name.nativeName ?? {}).map((nn: any) => nn.official)]),
    languages: Object.values(c.languages ?? []),
    region: c.region,
    subregion: c.subregion,
    capital: c.capital?.join(','),
    area: c.area,
    flag: c.flag,
    population: c.population,
    neighbours: c.borders ?? [],
  };
}

async function get(path: string): Promise<any> {
  const fullPath = `https://restcountries.com/v3.1/${path}`;
  const request = new Request(fullPath);
  const response = await fetch(request);
  return response.json();
}