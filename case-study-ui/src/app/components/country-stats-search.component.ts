import { DecimalPipe } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ApiService } from '../api.service';
import { CountryStatsSearchFilters, CountryStatsSearchResult } from '../models/stats.model';
import { RegionSummary } from '../models/region.model';

@Component({
  standalone: true,
  selector: 'app-country-stats-search',
  imports: [ReactiveFormsModule, DecimalPipe],
  template: `
    <section class="container">
      <header class="section-header">
        <h1>Country Statistics</h1>
        <p>Filter by region and year range.</p>
      </header>

      <form [formGroup]="filterForm" (ngSubmit)="onSubmit()" class="filters">
        <div class="filter-field">
          <label for="regionId">Region</label>
          <select id="regionId" formControlName="regionId">
            <option [ngValue]="''">All regions</option>
            @for (region of regions(); track region.id) {
              <option [ngValue]="region.id">{{ region.name }}</option>
            }
          </select>
        </div>

        <div class="filter-field">
          <label for="fromYear">From year</label>
          <input id="fromYear" type="number" formControlName="fromYear" />
        </div>

        <div class="filter-field">
          <label for="toYear">To year</label>
          <input id="toYear" type="number" formControlName="toYear" />
        </div>

        <div class="filter-actions">
          <button type="submit">Search</button>
          <button type="button" (click)="resetFilters()">Reset</button>
        </div>
      </form>

      @if (hasSearched() && loading()) {
        <p class="loading">Loading results…</p>
      }

      @if (hasSearched() && !loading() && results().length === 0) {
        <p class="empty-state">No statistics found for the selected filters.</p>
      }

      @if (!loading() && paginatedResults().length > 0) {
        <table class="data-table">
          <thead>
            <tr>
              <th scope="col">Continent</th>
              <th scope="col">Region</th>
              <th scope="col">Country</th>
              <th scope="col">Year</th>
              <th scope="col">Population</th>
              <th scope="col">GDP</th>
            </tr>
          </thead>
          <tbody>
            @for (stat of paginatedResults(); track $index) {
              <tr>
                <td>{{ stat.continent }}</td>
                <td>{{ stat.region }}</td>
                <td>{{ stat.country }}</td>
                <td>{{ stat.year }}</td>
                <td>{{ stat.population | number:'1.0-0' }}</td>
                <td>{{ stat.gdp | number:'1.0-0' }}</td>
              </tr>
            }
          </tbody>
        </table>
      }

      @if (!loading() && totalPages() > 1) {
        <div class="pagination">
          <button type="button" (click)="changePage(-1)" [disabled]="page() === 0">Previous</button>
          <span>Page {{ page() + 1 }} of {{ totalPages() }}</span>
          <button
            type="button"
            (click)="changePage(1)"
            [disabled]="page() >= totalPages() - 1"
          >
            Next
          </button>
        </div>
      }
    </section>
  `,
  styles: `
    .container {
      max-width: 1000px;
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

    .filters {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 1.5rem;
      align-items: flex-end;
    }

    .filter-field {
      display: flex;
      flex-direction: column;
      min-width: 10rem;
    }

    .filter-field label {
      font-weight: 600;
      margin-bottom: 0.35rem;
    }

    .filters select,
    .filters input {
      padding: 0.5rem 0.6rem;
      border: 1px solid #c9c9c9;
      border-radius: 0.5rem;
      background-color: #fff;
      font-size: 0.95rem;
    }

    .filters select:focus,
    .filters input:focus {
      outline: none;
      border-color: #0b0931ff;
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
    }

    .filter-actions {
      display: flex;
      gap: 0.75rem;
    }

    .filter-actions button {
      min-width: 6rem;
      padding: 0.55rem 1.25rem;
      border-radius: 9px;
      border: none;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out, transform 0.1s ease-in-out;
    }

    .filter-actions button[type='submit'] {
      background-color: #1f2933;
      color: #fff;
    }

    .filter-actions button[type='submit']:hover {
      background-color: #fbbf24;
    }

    .filter-actions button[type='button'] {
      background-color: #e5e7eb;
      color: #111827;
    }

    .filter-actions button[type='button']:hover {
      background-color: #d1d5db;
    }

    .filter-actions button:active {
      transform: translateY(1px);
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

    .pagination {
      margin-top: 1rem;
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .loading,
    .empty-state {
      color: #555;
    }
  `
})

export class CountryStatsSearchComponent {
  private readonly api = inject(ApiService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly filterForm = this.fb.group({
    regionId: ['' as number | '' | null],
    fromYear: [null as number | null],
    toYear: [null as number | null]
  });

  protected readonly regions = signal<RegionSummary[]>([]);
  protected readonly results = signal<CountryStatsSearchResult[]>([]);
  protected readonly loading = signal(false);
  protected readonly hasSearched = signal(false);
  protected readonly page = signal(0);
  private readonly pageSize = 50;

  protected readonly paginatedResults = computed(() => {
    const currentPage = this.page();
    const allResults = this.results();
    const start = currentPage * this.pageSize;
    return allResults.slice(start, start + this.pageSize);
  });

  protected readonly totalPages = computed(() => {
    const total = this.results().length;
    return total === 0 ? 0 : Math.ceil(total / this.pageSize);
  });

  constructor() {
    this.loadRegions();
  }

  protected onSubmit(): void {
    const raw = this.filterForm.getRawValue();
    console.log(raw);
    const filters: CountryStatsSearchFilters = {
      regionId:
        raw.regionId !== null && raw.regionId !== undefined && raw.regionId !== ''
          ? Number(raw.regionId)
          : undefined,
      fromYear:
        raw.fromYear !== null && raw.fromYear !== undefined
          ? Number(raw.fromYear)
          : undefined,
      toYear:
        raw.toYear !== null && raw.toYear !== undefined
          ? Number(raw.toYear)
          : undefined
    };

    this.fetchResults(filters);
  }

  protected resetFilters(): void {
    this.filterForm.reset({ regionId: '', fromYear: null, toYear: null });
    this.results.set([]);
    this.page.set(0);
    this.hasSearched.set(false);
    this.loading.set(false);
  }

  protected changePage(delta: number): void {
    const nextPage = this.page() + delta;
    const lastPageIndex = this.totalPages() - 1;

    if (nextPage < 0 || lastPageIndex < 0 || nextPage > lastPageIndex) {
      return;
    }

    this.page.set(nextPage);
  }

  private loadRegions(): void {
    this.api
      .getRegions()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (regions) => this.regions.set(regions),
        error: () => this.regions.set([])
      });
  }

  private fetchResults(filters: CountryStatsSearchFilters): void {
    this.loading.set(true);
    this.hasSearched.set(true);

    this.api
      .searchCountryStats(filters)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (results) => {
          this.results.set(results);
          this.page.set(0);
          this.loading.set(false);
        },
        error: () => {
          this.results.set([]);
          this.page.set(0);
          this.loading.set(false);
        }
      });
  }
}
