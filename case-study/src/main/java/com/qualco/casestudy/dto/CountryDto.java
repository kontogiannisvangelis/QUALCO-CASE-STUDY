package com.qualco.casestudy.dto;

public class CountryDto {

    private int id;

    private String name;

    private double area;

    private String countryCode2;

    public CountryDto(int id, String name, double area, String countryCode2) {
        this.id = id;
        this.name = name;
        this.area = area;
        this.countryCode2 = countryCode2;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getArea() {
        return area;
    }

    public void setArea(double area) {
        this.area = area;
    }

    public String getCountryCode2() {
        return countryCode2;
    }

    public void setCountryCode2(String countryCode2) {
        this.countryCode2 = countryCode2;
    }
}
