import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { catchError, map, of } from 'rxjs';

import { ApiService } from '../api.service';
import { CountrySummary } from '../models/country.model';

@Component({
  standalone: true,
  selector: 'app-countries-list',
  imports: [AsyncPipe, RouterLink, DecimalPipe],
  template: `
    <section class="container">
      <header class="section-header">
        <h1>Countries</h1>
        <p>Select a country to view its spoken languages.</p>
      </header>

      @if (countries$ | async; as countries) {
        @if (countries.length === 0) {
          <p class="empty-state">No countries available.</p>
        } @else {
          <table class="data-table">
            <thead>
              <tr>
                <th scope="col">Country</th>
                <th scope="col">Area</th>
                <th scope="col">Code</th>
              </tr>
            </thead>
            <tbody>
              @for (country of countries; track country.id;) {
                <tr>
                  <td>
                    <a class="country-link" [routerLink]="['/countries', country.id, 'languages']" [queryParams]="{ name: country.name }">
                      {{ country.name }}
                    </a>
                  </td>
                  <td>{{ country.area | number:'1.0-0' }}</td>
                  <td>{{ country.countryCode2 }}</td>
                </tr>
              }
            </tbody>
          </table>
        }
      } @else {
        <p class="loading">Loading countries…</p>
      }
    </section>
  `,
  styles: `
    .container {
      max-width: 720px;
      margin: 0 auto;
      padding: 1.5rem 1rem;
    }

    .section-header {
      margin-bottom: 1.5rem;
    }

    .section-header h1 {
      margin: 0 0 0.25rem;
      font-size: 1.75rem;
    }

    .section-header p {
      margin: 0;
      color: #444;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
    }

    .data-table th,
    .data-table td {
      border: 1px solid #ccc;
      padding: 0.5rem;
      text-align: left;
    }

    .data-table th {
      background-color: #f5f5f5;
    }
    .country-link {
      color: #007bff;
      text-decoration: none;
    }
    .loading,
    .empty-state {
      color: #555;
    }
  `
})

export class CountriesListComponent {
  private readonly api = inject(ApiService);
  protected readonly countries$ = this.api
    .getCountries()
    .pipe(
      map((countries: CountrySummary[]) => [...countries].sort((a, b) => a.name.localeCompare(b.name))),
      catchError(() => of([]))
    );
}
