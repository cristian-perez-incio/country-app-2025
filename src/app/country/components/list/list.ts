import { Component, input } from '@angular/core';
import type { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-list',
  imports: [],
  templateUrl: './list.html'
})
export class List {

  countries = input.required<Country[]>();

}
