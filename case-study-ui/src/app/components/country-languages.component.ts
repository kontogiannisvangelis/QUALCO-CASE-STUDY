import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, map, of, switchMap } from 'rxjs';

import { ApiService } from '../api.service';
import { CountryLanguage } from '../models/country.model';

@Component({
  standalone: true,
  selector: 'app-country-languages',
  imports: [AsyncPipe, RouterLink],
  template: `
    <section class="container">
      <header class="section-header">
        <h1>
          @if (countryName$ | async; as name) {
            Spoken Languages in {{ name || 'Country' }}
          } @else {
            Spoken Languages
          }
        </h1>
        <a routerLink="/countries">Back to countries</a>
      </header>

      @if (languages$ | async; as languages) {
        @if (languages.length === 0) {
          <p class="empty-state">No language information found for this country.</p>
        } @else {
          <ul class="language-list">
            @for (language of languages; track language.name) {
              <li>{{ language.name }}</li>
            }
          </ul>
        }
      } @else {
        <p class="loading">Loading languages…</p>
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
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .section-header h1 {
      margin: 0;
      font-size: 1.75rem;
    }

    .language-list {
      padding-left: 1.25rem;
    }

    .loading,
    .empty-state {
      color: #555;
    }
  `
})
export class CountryLanguagesComponent {
  private readonly api = inject(ApiService);
  private readonly route = inject(ActivatedRoute);

  protected readonly countryName$ = this.route.queryParamMap.pipe(
    map((params) => params.get('name') ?? '')
  );

  protected readonly languages$ = this.route.paramMap.pipe(
    map((params) => params.get('countryId') ?? ''),
    switchMap((countryId) => {
      if (!countryId) {
        return of<CountryLanguage[]>([]);
      }
      return this.api.getCountryLanguages(countryId).pipe(catchError(() => of([])));
    })
  );
}
