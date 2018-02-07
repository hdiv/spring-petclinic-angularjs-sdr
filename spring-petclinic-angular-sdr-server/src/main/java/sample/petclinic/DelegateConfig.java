package sample.petclinic;

import org.hdiv.config.annotation.ExclusionRegistry;
import org.hdiv.config.annotation.RuleRegistry;
import org.hdiv.ee.config.annotation.ValidationConfigurer;
import org.hdiv.filter.ValidatorFilter;
import org.hdiv.listener.InitListener;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.hateoas.config.EnableEntityLinks;

import com.hdivsecurity.services.config.EnableHdiv4ServicesSecurityConfiguration;
import com.hdivsecurity.services.config.HdivServicesSecurityConfigurerAdapter;
import com.hdivsecurity.services.config.ServicesSecurityConfigBuilder;

@Configuration
@EnableHdiv4ServicesSecurityConfiguration
@EnableEntityLinks
public class DelegateConfig extends HdivServicesSecurityConfigurerAdapter {

	@Bean
	public FilterRegistrationBean filterRegistrationBean() {
		FilterRegistrationBean registrationBean = new FilterRegistrationBean();
		ValidatorFilter validatorFilter = new ValidatorFilter();
		registrationBean.setFilter(validatorFilter);
		registrationBean.setOrder(0);

		return registrationBean;
	}

	@Bean
	public InitListener initListener() {
		return new InitListener();
	}

	@Override
	public void configure(final ServicesSecurityConfigBuilder builder) {
		builder.hypermediaSupport(true).confidentiality(false).sessionExpired().homePage("/");
		builder.showErrorPageOnEditableValidation(true);
		builder.reuseExistingPageInAjaxRequest(true);
		builder.urlObfuscation(false);
	}

	@Override
	public void addExclusions(final ExclusionRegistry registry) {
		registry.addUrlExclusions("/angular/.*", "/images/.*", "/scripts/.*", "/styles/.*", "/fonts/.*", "/index.html", "/vendors/.*",
				"/bootstrap/.*");
		registry.addUrlExclusions("/api", ".*.js", ".*.css");
	}

	@Override
	public void addRules(final RuleRegistry registry) {
		registry.addRule("safeText").acceptedPattern("^[a-zA-Z0-9 @.\\-:_+#]*$").rejectedPattern("(\\s|\\S)*(--)(\\s|\\S)*]");
		registry.addRule("numbers").acceptedPattern("^[1-9]\\d*$");
	}

	@Override
	public void configureEditableValidation(final ValidationConfigurer validationConfigurer) {
		validationConfigurer.addValidation("/.*").forParameters("page", "size").rules("numbers").disableDefaults();
		validationConfigurer.addValidation("/.*").forParameters("sort", "projection").rules("safeText").disableDefaults();
		validationConfigurer.addValidation("/.*").rules("safeText").disableDefaults();
	}

}
