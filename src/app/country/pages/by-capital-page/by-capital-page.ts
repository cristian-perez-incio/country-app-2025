import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { List } from "../../components/list/list";
import { SearchInput } from "../../components/search-input/search-input";
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'country-by-capital-page',
  imports: [List, SearchInput],
  templateUrl: './by-capital-page.html'
})
export class ByCapitalPage {

  countryService = inject(CountryService);

  query = signal('');

  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);
      return this.countryService.searchByCapital(params.query);
    }
  });

}
