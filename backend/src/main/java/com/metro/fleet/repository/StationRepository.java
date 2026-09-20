package com.metro.fleet.repository;

import com.metro.fleet.entity.Station;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StationRepository extends JpaRepository<Station, Long> {
    Station findByStationCode(String stationCode);
}
