package com.metro.fleet.controller;

import com.metro.fleet.entity.Planning;
import com.metro.fleet.service.PlanningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/planning")
public class PlanningController {

    @Autowired
    private PlanningService planningService;

    @GetMapping
    public List<Planning> getAllPlannings() {
        return planningService.getAllPlannings();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Planning> getPlanningById(@PathVariable Long id) {
        Planning planning = planningService.getPlanningById(id);
        return planning != null ? ResponseEntity.ok(planning) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Planning createPlanning(@RequestBody Planning planning) {
        return planningService.createPlanning(planning);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Planning> updatePlanning(@PathVariable Long id, @RequestBody Planning planning) {
        Planning updated = planningService.updatePlanning(id, planning);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlanning(@PathVariable Long id) {
        return planningService.deletePlanning(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
