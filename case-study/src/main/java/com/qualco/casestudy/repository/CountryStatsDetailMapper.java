package com.qualco.casestudy.repository;

import com.qualco.casestudy.model.CountryStatsDetail;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CountryStatsDetailMapper {
    List<CountryStatsDetail> findStatsByFilters(Integer regionId,Integer fromYear,Integer toYear);
}
