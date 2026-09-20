package com.metro.fleet.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "route")
@Getter
@Setter
@NoArgsConstructor
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "line_key", nullable = false, unique = true, length = 20)
    private String lineKey;

    @Column(name = "line_name", nullable = false, length = 50)
    private String lineName;

    @Column(name = "total_stations")
    private Integer totalStations;

    @Column(name = "distance_km")
    private Double distanceKm;

    @Column(name = "start_station", length = 100)
    private String startStation;

    @Column(name = "end_station", length = 100)
    private String endStation;

    @Column(length = 20)
    private String status = "Operational";

    @OneToMany(mappedBy = "route", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @OrderBy("sequenceNo ASC")
    private List<RouteStation> stationList = new ArrayList<>();
}
