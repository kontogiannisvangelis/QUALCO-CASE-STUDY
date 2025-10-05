import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { catchError, of } from 'rxjs';

import { ApiService } from '../api.service';

@Component({
  standalone: true,
  selector: 'app-max-gdp-stats',
  imports: [AsyncPipe, DecimalPipe],
  template: `
    <section class="container">
      <header class="section-header">
        <h1>Countries by Max GDP per Population</h1>
        <p>The record with the highest GDP per population ratio for each country.</p>
      </header>

      @if (stats$ | async; as stats) {
        @if (stats.length === 0) {
          <p class="empty-state">No statistics available.</p>
        } @else {
          <table class="data-table">
            <thead>
              <tr>
                <th scope="col">Country</th>
                <th scope="col">Code</th>
                <th scope="col">Year</th>
                <th scope="col">Population</th>
                <th scope="col">GDP</th>
              </tr>
            </thead>
            <tbody>
              @for (stat of stats; track stat.countryCode3) {
                <tr>
                  <td>{{ stat.name }}</td>
                  <td>{{ stat.countryCode3 }}</td>
                  <td>{{ stat.year }}</td>
                  <td>{{ stat.population | number:'1.0-0' }}</td>
                  <td>{{ stat.gdp | number:'1.0-0' }}</td>
                </tr>
              }
            </tbody>
          </table>
        }
      } @else {
        <p class="loading">Loading statistics…</p>
      }
    </section>
  `,
  styles: `
    .container {
      max-width: 960px;
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

    .loading,
    .empty-state {
      color: #555;
    }
  `
})
export class MaxGdpStatsComponent {
  private readonly api = inject(ApiService);

  protected readonly stats$ = this.api.getMaxGdpPerCountryStats().pipe(catchError(() => of([])));
}
