import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { List } from "../../components/list/list";
import { CountryService } from '../../services/country.service';
import type { Region } from '../../interfaces/region.type';

@Component({
  selector: 'country-by-region-page',
  imports: [List],
  templateUrl: './by-region-page.html'
})
export class ByRegionPage {

  countryService = inject(CountryService);

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  selectedRegion = signal<Region | null>(null);

  countryResource = rxResource({
    params: () => ({ region: this.selectedRegion() }),
    stream: ({ params }) => {
      if (!params.region) return of([]);
      return this.countryService.searchByRegion(params.region);
    }
  });

}
