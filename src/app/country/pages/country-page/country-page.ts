import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { CountryDetailsPage } from './country-details-page/country-details-page';
import { NotFound } from 'src/app/shared/components/not-found/not-found';

@Component({
  selector: 'app-country-page',
  imports: [CountryDetailsPage, NotFound],
  templateUrl: './country-page.html'
})
export class CountryPage {

  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  countryService = inject(CountryService);

  countryResource = rxResource({
    params: () => ({ code: this.countryCode }),
    stream: ({ params }) => {
      return this.countryService.searchByCode(params.code);
    }
  });

}
