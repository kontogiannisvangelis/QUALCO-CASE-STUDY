package com.qualco.casestudy.service;

import com.qualco.casestudy.dto.CountryStatsDetailDto;
import com.qualco.casestudy.dto.CountryStatsDto;
import com.qualco.casestudy.model.CountryStats;
import com.qualco.casestudy.repository.CountryStatsDetailMapper;
import com.qualco.casestudy.repository.CountryStatsMapper;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class StatsService {

    Logger LOGGER = Logger.getLogger(StatsService.class.getName());

    private CountryStatsMapper countryStatsMapper;

    private CountryStatsDetailMapper countryStatsDetailMapper;

    public StatsService(CountryStatsMapper countryStatsMapper, CountryStatsDetailMapper countryStatsDetailMapper) {
        this.countryStatsMapper = countryStatsMapper;
        this.countryStatsDetailMapper = countryStatsDetailMapper;
    }

    public List<CountryStats> getMaxGdpPerCountry() {
        LOGGER.info("getMaxGdpPerCountry");
        return countryStatsMapper.getMaxGdpPerCountry();
    }

    public List<CountryStatsDetailDto> searchStats(Integer regionId,Integer fromYear,Integer toYear) {
        LOGGER.info(createLoggerInfoMessageSearchStats(regionId, fromYear, toYear));
        return countryStatsDetailMapper
                .findStatsByFilters(regionId, fromYear, toYear)
                .stream()
                .map(s -> new CountryStatsDetailDto(
                        s.getRegion(),
                        s.getContinent(),
                        s.getCountry(),
                        s.getYear(),
                        s.getPopulation(),
                        s.getGdp()
                ))
                .collect(Collectors.toList());
    }

    private String createLoggerInfoMessageSearchStats(Integer regionId,Integer fromYear,Integer toYear  ) {
        StringBuilder sb = new StringBuilder("searchStats");
        if (regionId != null) {
            sb.append(" regiondId: ").append(regionId);
        }
        if (fromYear != null) {
            sb.append(" fromYear: ").append(fromYear);
        }
        if (toYear != null) {
            sb.append(" toYear: ").append(toYear);
        }
        return sb.toString();
    }
}
