package sample.petclinic.model;

import java.util.Set;

import org.hdiv.services.SecureIdentifiable;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "withPets", types = Owner.class)
public interface OwnerWithPets extends SecureIdentifiable<Integer> {

	Integer getId();

	String getAddress();

	String getCity();

	String getFirstName();

	String getLastName();

	String getTelephone();

	Set<InlinedPet> getPets();

}
