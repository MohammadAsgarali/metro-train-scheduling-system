package com.metro.fleet.repository;

import com.metro.fleet.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findByTrainNumber(String trainNumber);
    List<Schedule> findByLine(String line);
}
