package com.qualco.casestudy.controller;

import com.qualco.casestudy.dto.RegionDto;
import com.qualco.casestudy.service.RegionService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/regions")
public class RegionContoller {

    private final RegionService regionService;

    public RegionContoller(RegionService regionService) {
        this.regionService = regionService;
    }

    @GetMapping
    public List<RegionDto> getAllRegions() {
        return regionService.getAllRegions();
    }
}
