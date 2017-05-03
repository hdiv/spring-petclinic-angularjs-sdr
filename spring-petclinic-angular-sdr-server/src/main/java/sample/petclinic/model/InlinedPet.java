package sample.petclinic.model;

import java.time.LocalDate;
import java.util.Set;

import org.springframework.data.rest.core.config.Projection;
import org.springframework.hateoas.Identifiable;

@Projection(name = "inline", types = { Pet.class })
public interface InlinedPet extends Identifiable<Integer> {

	@Override
	Integer getId();

	String getName();

	LocalDate getBirthDate();

	PetType getType();

	Owner getOwner();

	Set<Visit> getVisits();

}
