export interface MaxGdpPerCountryStat {
  name: string;
  countryCode3: string;
  year: number;
  population: number;
  gdp: number;
}



export interface CountryStatsSearchFilters {
  regionId?: number | null;
  fromYear?: number | null;
  toYear?: number | null;
}

export interface CountryStatsSearchResult {
  continent: string;
  region: string;
  country: string;
  year: number;
  population: number;
  gdp: number;
}