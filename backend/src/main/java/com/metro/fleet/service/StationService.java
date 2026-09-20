package com.metro.fleet.service;

import com.metro.fleet.entity.Station;
import com.metro.fleet.repository.StationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StationService {

    @Autowired
    private StationRepository stationRepository;

    public List<Station> getAllStations() {
        return stationRepository.findAll();
    }

    public Station getStationById(Long id) {
        return stationRepository.findById(id).orElse(null);
    }

    public Station createStation(Station station) {
        return stationRepository.save(station);
    }

    public Station updateStation(Long id, Station updated) {
        return stationRepository.findById(id).map(s -> {
            s.setStationCode(updated.getStationCode());
            s.setStationName(updated.getStationName());
            s.setLine(updated.getLine());
            s.setZone(updated.getZone());
            s.setPlatforms(updated.getPlatforms());
            s.setStatus(updated.getStatus());
            return stationRepository.save(s);
        }).orElse(null);
    }

    public boolean deleteStation(Long id) {
        if (stationRepository.existsById(id)) {
            stationRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
