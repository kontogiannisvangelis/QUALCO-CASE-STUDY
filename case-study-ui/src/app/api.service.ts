import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CountryLanguage, CountrySummary } from './models/country.model';
import { RegionSummary } from './models/region.model';
import {
  CountryStatsSearchFilters,
  CountryStatsSearchResult,
  MaxGdpPerCountryStat,
} from './models/stats.model';
import {environment} from '../enviroments/environment';


@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;

  getCountries(): Observable<CountrySummary[]> {
    return this.http.get<CountrySummary[]>(`${this.baseUrl}/countries`);
  }

  getCountryLanguages(countryId: string): Observable<CountryLanguage[]> {
    return this.http.get<CountryLanguage[]>(`${this.baseUrl}/countries/${countryId}/languages`);
  }

  getMaxGdpPerCountryStats(): Observable<MaxGdpPerCountryStat[]> {
    return this.http.get<MaxGdpPerCountryStat[]>(`${this.baseUrl}/countries/stats/max-gdp-per-country`);
  }

  getRegions(): Observable<RegionSummary[]> {
    return this.http.get<RegionSummary[]>(`${this.baseUrl}/regions`);
  }

  searchCountryStats(filters: CountryStatsSearchFilters): Observable<CountryStatsSearchResult[]> {
    let params = new HttpParams();

    if (filters.regionId !== undefined && filters.regionId !== null) {
      params = params.set('regionId', String(filters.regionId));
    }

    if (filters.fromYear !== undefined && filters.fromYear !== null) {
      params = params.set('fromYear', String(filters.fromYear));
    }

    if (filters.toYear !== undefined && filters.toYear !== null) {
      params = params.set('toYear', String(filters.toYear));
    }

    return this.http.get<CountryStatsSearchResult[]>(`${this.baseUrl}/countries/stats/search`, {
      params
    });
  }
}
