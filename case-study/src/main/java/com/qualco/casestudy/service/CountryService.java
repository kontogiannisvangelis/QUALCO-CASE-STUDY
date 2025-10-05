package com.qualco.casestudy.service;

import com.qualco.casestudy.dto.CountryDto;
import com.qualco.casestudy.dto.LanguageDto;
import com.qualco.casestudy.repository.CountryMapper;
import com.qualco.casestudy.repository.LanguageMapper;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class CountryService {

    private final Logger LOGGER = Logger.getLogger(CountryService.class.getName());

    private final CountryMapper countryMapper;

    private final LanguageMapper languageMapper;

    public CountryService(CountryMapper countryMapper, LanguageMapper languageMapper) {
        this.countryMapper = countryMapper;
        this.languageMapper = languageMapper;
    }

    public List<CountryDto> getAllCountries() {
        LOGGER.info("getAllCountries");
        return countryMapper.findSummaries()
                .stream()
                .map(c -> new CountryDto(c.getCountryId(), c.getName(), c.getArea(), c.getCountryCode2()))
                .collect(Collectors.toList());
    }

    public List<LanguageDto> getLanguagesByCountry(int countryId) {
        LOGGER.info("getLanguagesByCountry Id: " + countryId);
        return languageMapper.findByCountryId(countryId)
                .stream()
                .map(l -> new LanguageDto(l.getName()))
                .collect(Collectors.toList());
    }

}
