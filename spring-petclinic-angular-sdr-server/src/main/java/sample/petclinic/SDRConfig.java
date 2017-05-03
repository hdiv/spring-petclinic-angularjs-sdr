package sample.petclinic;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

import sample.petclinic.model.Owner;
import sample.petclinic.model.Pet;
import sample.petclinic.model.PetType;
import sample.petclinic.model.Visit;

@Configuration
public class SDRConfig {

	@Bean
	public RepositoryRestConfigurer repositoryRestConfigurer() {
		return new RepositoryRestConfigurerAdapter() {
			@Override
			public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
				config.exposeIdsFor(Owner.class, Pet.class, PetType.class, Visit.class);
			}
		};
	}
}