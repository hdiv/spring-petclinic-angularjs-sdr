package sample.petclinic.model;

import java.util.Set;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "vetWithSpecialty", types = { Vet.class })
public interface VetWithSpecialty {

	String getFirstName();

	String getLastName();

	Set<Specialty> getSpecialties();
}
