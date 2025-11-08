import { Component, input } from '@angular/core';
import type { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe],
  templateUrl: './list.html'
})
export class List {

  countries = input.required<Country[]>();

}
