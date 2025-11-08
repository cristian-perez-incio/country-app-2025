import { Component, inject, resource, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { SearchInput } from "../../components/search-input/search-input";
import { List } from "../../components/list/list";
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'country-by-country-page',
  imports: [SearchInput, List],
  templateUrl: './by-country-page.html'
})
export class ByCountryPage {

  countryService = inject(CountryService);

  query = signal('');

  countryResource = resource({
    params: () => ({ query: this.query() }),
    loader: async ({ params }) => {
      if (!params.query) return [];

      return await firstValueFrom(
        this.countryService.searchByCountryName(params.query)
      );
    }
  })

}
