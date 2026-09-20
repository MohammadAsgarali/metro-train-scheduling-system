package com.metro.fleet.service;

import com.metro.fleet.entity.Train;
import com.metro.fleet.repository.TrainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainService {

    @Autowired
    private TrainRepository trainRepository;

    public List<Train> getAllTrains() {
        return trainRepository.findAll();
    }

    public Train getTrainById(Long id) {
        return trainRepository.findById(id).orElse(null);
    }

    public Train createTrain(Train train) {
        return trainRepository.save(train);
    }

    public Train updateTrain(Long id, Train updated) {
        return trainRepository.findById(id).map(t -> {
            t.setTrainNumber(updated.getTrainNumber());
            t.setLine(updated.getLine());
            t.setType(updated.getType());
            t.setCapacity(updated.getCapacity());
            t.setCurrentStation(updated.getCurrentStation());
            t.setStatus(updated.getStatus());
            return trainRepository.save(t);
        }).orElse(null);
    }

    public boolean deleteTrain(Long id) {
        if (trainRepository.existsById(id)) {
            trainRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
