package com.metro.fleet.repository;

import com.metro.fleet.entity.Train;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrainRepository extends JpaRepository<Train, Long> {
    Train findByTrainNumber(String trainNumber);
}
