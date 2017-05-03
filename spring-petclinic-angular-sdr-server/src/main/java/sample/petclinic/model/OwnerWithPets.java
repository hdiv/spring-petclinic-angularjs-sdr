package sample.petclinic.model;

import java.util.Set;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "withPets", types = Owner.class)
public interface OwnerWithPets {

	Integer getId();

	String getAddress();

	String getCity();

	String getFirstName();

	String getLastName();

	String getTelephone();

	Set<InlinedPet> getPets();

}
