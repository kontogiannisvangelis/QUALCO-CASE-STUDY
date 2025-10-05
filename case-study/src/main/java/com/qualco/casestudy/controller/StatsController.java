package com.qualco.casestudy.controller;

import com.qualco.casestudy.dto.CountryStatsDetailDto;
import com.qualco.casestudy.dto.CountryStatsDto;
import com.qualco.casestudy.service.StatsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/countries/stats")
public class StatsController {

    private final StatsService statsService;

    public StatsController(StatsService statsService) {
        this.statsService = statsService;
    }

    @GetMapping("/max-gdp-per-country")
    public List<CountryStatsDto> getMaxGdpPerCountry() {
        return statsService.getMaxGdpPerCountry()
                .stream()
                .map(s -> new CountryStatsDto(s.getCountryCode3(), s.getName(), s.getYear(), s.getPopulation(), s.getGdp()))
                .collect(Collectors.toList());
    }

    @GetMapping("/search")
    public List<CountryStatsDetailDto> searchStats(
            @RequestParam(required = false) Integer regionId,
            @RequestParam(required = false) Integer fromYear,
            @RequestParam(required = false) Integer toYear
    ) {
        return statsService.searchStats(regionId, fromYear, toYear);
    }
}
