package com.metro.fleet.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "schedule")
@Getter
@Setter
@NoArgsConstructor
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "train_number", nullable = false, length = 20)
    private String trainNumber;

    @Column(nullable = false, length = 30)
    private String line;

    @Column(name = "from_station", length = 100)
    private String fromStation;

    @Column(name = "to_station", length = 100)
    private String toStation;

    @Column(name = "departure_time", length = 20)
    private String departureTime;

    @Column(name = "arrival_time", length = 20)
    private String arrivalTime;

    @Column
    private Integer platform;

    @Column(length = 20)
    private String status = "Scheduled";

    @Column(name = "schedule_date")
    private LocalDate scheduleDate;
}
