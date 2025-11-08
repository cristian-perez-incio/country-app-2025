import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
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

  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);
      return this.countryService.searchByCountryName(params.query);
    }
  });

}
