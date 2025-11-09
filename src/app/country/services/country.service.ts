import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from '@environments/environment';
import type { RESTCountry } from '../interfaces/rest-countries.interface';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

@Injectable({ providedIn: 'root' })
export class CountryService {

  private http = inject(HttpClient);
  private httpCache = new Map<string, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    return this.search('capital', query);
  }

  searchByCountryName(query: string): Observable<Country[]> {
    return this.search('name', query);
  }

  searchByCode(code: string): Observable<Country | undefined> {
    return this.search('alpha', code, 0)
      .pipe(
        map(countries => countries.at(0))
      );
  }

  private search(endpoint: string, query: string, due?: number): Observable<Country[]> {
    query = query.toLowerCase();
    const cacheKey = `${endpoint}|${query}`;

    if (this.httpCache.has(cacheKey)) {
      return of(this.httpCache.get(cacheKey)!);
    }

    return this.http
      .get<RESTCountry[]>(`${environment.restCountriesBaseUrl}/${endpoint}/${query}`)
      .pipe(
        map(CountryMapper.mapRESTCountriesToCountries),
        tap(countries => this.httpCache.set(cacheKey, countries)),
        delay(due ?? 2000),
        catchError(error => {
          console.error('Error fetching', error);
          return throwError(
            () => new Error(`No se encontraron resultados para la query '${query}'.`)
          )
        })
      );
  }

}
