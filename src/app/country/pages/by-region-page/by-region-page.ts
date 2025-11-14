import { Component, inject, linkedSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { List } from "../../components/list/list";
import { CountryService } from '../../services/country.service';
import type { Region } from '../../interfaces/region.type';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'country-by-region-page',
  imports: [List],
  templateUrl: './by-region-page.html'
})
export class ByRegionPage {

  countryService = inject(CountryService);

  router = inject(Router);

  activatedRoute = inject(ActivatedRoute);

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  regionParam = (this.activatedRoute.snapshot.queryParamMap.get('region') ?? '') as Region;

  selectedRegion = linkedSignal<Region | null>(() => this.regionParam);

  countryResource = rxResource({
    params: () => ({ region: this.selectedRegion() }),
    stream: ({ params }) => {
      if (!params.region) return of([]);
      this.router.navigate(['/country/by-region'], {
        queryParams: {
          region: params.region
        }
      });
      return this.countryService.searchByRegion(params.region);
    }
  });

}
