package com.metro.fleet.service;

import com.metro.fleet.entity.Schedule;
import com.metro.fleet.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    public List<Schedule> getAllSchedules() {
        return scheduleRepository.findAll();
    }

    public Schedule getScheduleById(Long id) {
        return scheduleRepository.findById(id).orElse(null);
    }

    public Schedule createSchedule(Schedule schedule) {
        return scheduleRepository.save(schedule);
    }

    public Schedule updateSchedule(Long id, Schedule updated) {
        return scheduleRepository.findById(id).map(s -> {
            s.setTrainNumber(updated.getTrainNumber());
            s.setLine(updated.getLine());
            s.setFromStation(updated.getFromStation());
            s.setToStation(updated.getToStation());
            s.setDepartureTime(updated.getDepartureTime());
            s.setArrivalTime(updated.getArrivalTime());
            s.setPlatform(updated.getPlatform());
            s.setStatus(updated.getStatus());
            s.setScheduleDate(updated.getScheduleDate());
            return scheduleRepository.save(s);
        }).orElse(null);
    }

    public boolean deleteSchedule(Long id) {
        if (scheduleRepository.existsById(id)) {
            scheduleRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
