package com.qualco.casestudy.repository;

import com.qualco.casestudy.model.Language;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface LanguageMapper {
    List<Language> findByCountryId(int countryId);
}
