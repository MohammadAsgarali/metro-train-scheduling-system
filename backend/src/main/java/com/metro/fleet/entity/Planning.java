package com.metro.fleet.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "planning")
@Getter
@Setter
@NoArgsConstructor
public class Planning {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "train_number", nullable = false, length = 20)
    private String trainNumber;

    @Column(nullable = false, length = 30)
    private String line;

    @Column(name = "planned_date")
    private LocalDate plannedDate;

    @Column(length = 30)
    private String status = "PENDING";

    @Column(length = 255)
    private String remarks;
}
