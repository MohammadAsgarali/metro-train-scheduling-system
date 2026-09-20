package com.metro.fleet.service;

import com.metro.fleet.entity.Route;
import com.metro.fleet.entity.RouteStation;
import com.metro.fleet.repository.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RouteService {

    @Autowired
    private RouteRepository routeRepository;

    public List<Route> getAllRoutes() {
        return routeRepository.findAll();
    }

    public Route getRouteById(Long id) {
        return routeRepository.findById(id).orElse(null);
    }

    public Route createRoute(Route route) {
        if (route.getStationList() != null) {
            for (RouteStation rs : route.getStationList()) {
                rs.setRoute(route);
            }
        }
        return routeRepository.save(route);
    }

    public Route updateRoute(Long id, Route updated) {
        return routeRepository.findById(id).map(r -> {
            r.setLineKey(updated.getLineKey());
            r.setLineName(updated.getLineName());
            r.setTotalStations(updated.getTotalStations());
            r.setDistanceKm(updated.getDistanceKm());
            r.setStartStation(updated.getStartStation());
            r.setEndStation(updated.getEndStation());
            r.setStatus(updated.getStatus());

            if (updated.getStationList() != null) {
                r.getStationList().clear();
                for (RouteStation rs : updated.getStationList()) {
                    rs.setRoute(r);
                    r.getStationList().add(rs);
                }
            }
            return routeRepository.save(r);
        }).orElse(null);
    }

    public boolean deleteRoute(Long id) {
        if (routeRepository.existsById(id)) {
            routeRepository.deleteById(id);
            return true;
        }
        return false;
    }

    /**
     * Finds routes connecting a start and destination station,
     * mirroring the client-side logic from routes.js but backend-driven.
     */
    public List<Route> findRoutesBetween(String start, String destination) {
        List<Route> allRoutes = routeRepository.findAll();
        return allRoutes.stream().filter(route -> {
            List<String> names = route.getStationList().stream()
                    .map(RouteStation::getStationName).toList();
            return names.contains(start) && names.contains(destination);
        }).toList();
    }
}
