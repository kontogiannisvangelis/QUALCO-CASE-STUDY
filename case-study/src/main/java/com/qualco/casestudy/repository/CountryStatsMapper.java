package com.qualco.casestudy.repository;

import com.qualco.casestudy.model.CountryStats;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CountryStatsMapper {
    List<CountryStats> getMaxGdpPerCountry();
}
