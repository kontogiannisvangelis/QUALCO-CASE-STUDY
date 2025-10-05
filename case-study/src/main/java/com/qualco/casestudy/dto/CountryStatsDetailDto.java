package com.qualco.casestudy.dto;

public class CountryStatsDetailDto {

    private String continent;

    private String region;

    private String country;

    private int year;

    private long population;

    private long gdp;

    public CountryStatsDetailDto(String region, String continent, String country, int year, long population, long gdp) {
        this.region = region;
        this.continent = continent;
        this.country = country;
        this.year = year;
        this.population = population;
        this.gdp = gdp;
    }

    public String getContinent() {
        return continent;
    }

    public void setContinent(String continent) {
        this.continent = continent;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public long getGdp() {
        return gdp;
    }

    public void setGdp(long gdp) {
        this.gdp = gdp;
    }

    public long getPopulation() {
        return population;
    }

    public void setPopulation(long population) {
        this.population = population;
    }
}
