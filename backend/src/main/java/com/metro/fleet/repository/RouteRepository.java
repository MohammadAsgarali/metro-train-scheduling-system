package com.metro.fleet.repository;

import com.metro.fleet.entity.Route;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RouteRepository extends JpaRepository<Route, Long> {
    Route findByLineKey(String lineKey);
}
