package com.qualco.casestudy.service;

import com.qualco.casestudy.dto.RegionDto;
import com.qualco.casestudy.repository.RegionMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class RegionService {

    private Logger LOGGER = Logger.getLogger(RegionService.class.getName());

    private final RegionMapper regionMapper;

    public RegionService(RegionMapper regionMapper) {
        this.regionMapper = regionMapper;
    }


    public List<RegionDto> getAllRegions() {
        LOGGER.info("getAllRegions");
        return regionMapper.findAll()
                .stream()
                .map(r -> new RegionDto(r.getRegionId(), r.getName()))
                .collect(Collectors.toList());
    }

}
