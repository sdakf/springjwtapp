package com.example.springjwt.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "vehicles")
public class Vehicle extends AbstractAuditableEntity<User, Long> {
    @Column
    private String model;



    public Vehicle(String model) {
        this.model = model;
    }

    public Vehicle() {
    }

    public static VehicleBuilder builder() {
        return new VehicleBuilder();
    }

    public String getModel() {
        return this.model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String toString() {
        return "Vehicle(model=" + this.getModel() + ")";
    }

    public static class VehicleBuilder {
        private String model;

        VehicleBuilder() {
        }

        public Vehicle.VehicleBuilder model(String model) {
            this.model = model;
            return this;
        }

        public Vehicle build() {
            return new Vehicle(model);
        }

        public String toString() {
            return "Vehicle.VehicleBuilder(model=" + this.model + ")";
        }
    }
}
