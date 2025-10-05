package com.qualco.casestudy.controller;

import com.qualco.casestudy.dto.CountryDto;
import com.qualco.casestudy.dto.LanguageDto;
import com.qualco.casestudy.service.CountryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/countries")
public class CountryController {

    private final CountryService countryService;

    public CountryController(CountryService countryService) {
        this.countryService = countryService;
    }

    @GetMapping
    public List<CountryDto> getAllCountries() {
        return countryService.getAllCountries();
    }

    @GetMapping("/{countryId}/languages")
    public List<LanguageDto> getLanguagesByCountry(@PathVariable int countryId) {
        return countryService.getLanguagesByCountry(countryId);
    }
}
