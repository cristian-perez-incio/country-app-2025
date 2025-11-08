import { Component, inject, signal } from '@angular/core';
import { List } from "../../components/list/list";
import { SearchInput } from "../../components/search-input/search-input";
import { CountryService } from '../../services/country.service';
import type { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-by-capital-page',
  imports: [List, SearchInput],
  templateUrl: './by-capital-page.html'
})
export class ByCapitalPage {

  countryService = inject(CountryService);

  isLoading = signal(false);
  hasError = signal<string | null>(null);
  countries = signal<Country[]>([]);

  onSearch(query: string) {
    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.hasError.set(null);

    this.countryService.searchByCapital(query).subscribe(countries => {
      this.isLoading.set(false);
      this.countries.set(countries);
      console.log({ countries });
    });
  }

}
