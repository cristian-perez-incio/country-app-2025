import type { Country } from '../interfaces/country.interface';
import type { RESTCountry } from '../interfaces/rest-countries.interface';

export class CountryMapper {

  static mapRESTCountryToCountry(restCountry: RESTCountry): Country {
    return {
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'No Spanish name',
      capital: restCountry.capital,
      population: restCountry.population
    }
  }

  static mapRESTCountriesToCountries(restCountries: RESTCountry[]): Country[] {
    return restCountries.map(CountryMapper.mapRESTCountryToCountry);
  }

}
