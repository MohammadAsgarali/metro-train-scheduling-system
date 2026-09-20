package com.metro.fleet.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "train")
@Getter
@Setter
@NoArgsConstructor
public class Train {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "train_number", nullable = false, unique = true, length = 20)
    private String trainNumber;

    @Column(nullable = false, length = 30)
    private String line;

    @Column(length = 20)
    private String type;

    @Column
    private Integer capacity;

    @Column(name = "current_station", length = 100)
    private String currentStation;

    @Column(length = 20)
    private String status = "Running";
}
