package com.example.springjwt.domain;

import javax.persistence.*;
import java.io.Serializable;

@MappedSuperclass
public abstract  class AbstractPersistableEntity<ID extends Serializable> implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private ID id;

    @Version
    private Long version;

    public ID getId() {
        return this.id;
    }

    public Long getVersion() {
        return this.version;
    }

    public void setId(ID id) {
        this.id = id;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof AbstractPersistableEntity)) return false;
        final AbstractPersistableEntity<?> other = (AbstractPersistableEntity<?>) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$id = this.getId();
        final Object other$id = other.getId();
        if (this$id == null ? other$id != null : !this$id.equals(other$id)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof AbstractPersistableEntity;
    }

    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $id = this.getId();
        result = result * PRIME + ($id == null ? 43 : $id.hashCode());
        return result;
    }
}
