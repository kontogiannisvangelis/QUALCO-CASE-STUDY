package com.qualco.casestudy.repository;

import com.qualco.casestudy.model.Country;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CountryMapper {
    List<Country> findSummaries();
}
