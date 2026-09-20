package com.metro.fleet.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "route_station")
@Getter
@Setter
@NoArgsConstructor
public class RouteStation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "route_id", nullable = false)
    @JsonIgnore
    private Route route;

    @Column(name = "station_name", nullable = false, length = 100)
    private String stationName;

    @Column(name = "sequence_no", nullable = false)
    private Integer sequenceNo;
}
