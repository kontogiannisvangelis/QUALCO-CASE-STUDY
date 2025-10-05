package com.qualco.casestudy.repository;

import com.qualco.casestudy.model.Region;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RegionMapper {
    List<Region> findAll();
}
