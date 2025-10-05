import { Routes } from '@angular/router';

import { CountriesListComponent } from './components/countries-list.component';
import { CountryLanguagesComponent } from './components/country-languages.component';
import { CountryStatsSearchComponent } from './components/country-stats-search.component';
import { MaxGdpStatsComponent } from './components/max-gdp-stats.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'countries' },
  { path: 'countries', component: CountriesListComponent },
  { path: 'countries/:countryId/languages', component: CountryLanguagesComponent },
  { path: 'stats/max-gdp', component: MaxGdpStatsComponent },
  { path: 'stats/search', component: CountryStatsSearchComponent },
  { path: '**', redirectTo: 'countries' }
];
