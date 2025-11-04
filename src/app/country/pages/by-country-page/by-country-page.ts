import { Component } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { List } from "../../components/list/list";

@Component({
  selector: 'country-by-country-page',
  imports: [SearchInput, List],
  templateUrl: './by-country-page.html'
})
export class ByCountryPage {

}
