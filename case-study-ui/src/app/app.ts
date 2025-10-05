import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly links = [
    { path: '/countries', label: 'Countries' },
    { path: '/stats/max-gdp', label: 'Max GDP per Population' },
    { path: '/stats/search', label: 'Country Stats Search' }
  ];
}
