import { Component } from '@angular/core';
import { List } from "../../components/list/list";
import { SearchInput } from "../../components/search-input/search-input";

@Component({
  selector: 'country-by-capital-page',
  imports: [List, SearchInput],
  templateUrl: './by-capital-page.html'
})
export class ByCapitalPage {

  onSearch(value: string) {
    console.log({ value });
  }

}
