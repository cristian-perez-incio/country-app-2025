import { DecimalPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import type { Country } from 'src/app/country/interfaces/country.interface';

@Component({
  selector: 'country-details-page',
  imports: [DecimalPipe],
  templateUrl: './country-details-page.html'
})
export class CountryDetailsPage {

  country = input.required<Country>();

  currentYear = computed(() => {
    return new Date().getFullYear();
  });

}
