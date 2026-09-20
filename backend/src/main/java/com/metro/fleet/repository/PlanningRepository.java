package com.metro.fleet.repository;

import com.metro.fleet.entity.Planning;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlanningRepository extends JpaRepository<Planning, Long> {
    List<Planning> findByStatus(String status);
}
