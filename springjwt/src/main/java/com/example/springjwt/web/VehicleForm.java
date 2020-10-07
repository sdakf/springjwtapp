package com.example.springjwt.web;

public class VehicleForm {
    private String name;

    public VehicleForm(String name) {
        this.name = name;
    }

    public VehicleForm() {
    }

    public static VehicleFormBuilder builder() {
        return new VehicleFormBuilder();
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof VehicleForm)) return false;
        final VehicleForm other = (VehicleForm) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$name = this.getName();
        final Object other$name = other.getName();
        if (this$name == null ? other$name != null : !this$name.equals(other$name)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof VehicleForm;
    }

    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $name = this.getName();
        result = result * PRIME + ($name == null ? 43 : $name.hashCode());
        return result;
    }

    public String toString() {
        return "VehicleForm(name=" + this.getName() + ")";
    }

    public static class VehicleFormBuilder {
        private String name;

        VehicleFormBuilder() {
        }

        public VehicleForm.VehicleFormBuilder name(String name) {
            this.name = name;
            return this;
        }

        public VehicleForm build() {
            return new VehicleForm(name);
        }

        public String toString() {
            return "VehicleForm.VehicleFormBuilder(name=" + this.name + ")";
        }
    }
}
