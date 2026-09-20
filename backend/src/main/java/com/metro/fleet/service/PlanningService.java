package com.metro.fleet.service;

import com.metro.fleet.entity.Planning;
import com.metro.fleet.repository.PlanningRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlanningService {

    @Autowired
    private PlanningRepository planningRepository;

    public List<Planning> getAllPlannings() {
        return planningRepository.findAll();
    }

    public Planning getPlanningById(Long id) {
        return planningRepository.findById(id).orElse(null);
    }

    public Planning createPlanning(Planning planning) {
        return planningRepository.save(planning);
    }

    public Planning updatePlanning(Long id, Planning updated) {
        return planningRepository.findById(id).map(p -> {
            p.setTrainNumber(updated.getTrainNumber());
            p.setLine(updated.getLine());
            p.setPlannedDate(updated.getPlannedDate());
            p.setStatus(updated.getStatus());
            p.setRemarks(updated.getRemarks());
            return planningRepository.save(p);
        }).orElse(null);
    }

    public boolean deletePlanning(Long id) {
        if (planningRepository.existsById(id)) {
            planningRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
