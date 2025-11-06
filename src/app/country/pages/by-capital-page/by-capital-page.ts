import { Component, inject } from '@angular/core';
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

  onSearch(query: string) {
    this.countryService.searchByCapital(query).subscribe(response => {
      console.log({ response });
    });
  }

}
