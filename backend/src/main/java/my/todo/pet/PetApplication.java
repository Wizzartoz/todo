package my.todo.pet;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.web.HateoasPageableHandlerMethodArgumentResolver;
import org.springframework.data.web.HateoasSortHandlerMethodArgumentResolver;
import org.springframework.data.web.PagedResourcesAssembler;

@SpringBootApplication
public class PetApplication {

	public static void main(String[] args) {
		SpringApplication.run(PetApplication.class, args);
	}

	@Bean
	public ModelMapper modelMapper(){
		return new ModelMapper();
	}

	@Bean
	public HateoasSortHandlerMethodArgumentResolver sortResolver() {
		return new HateoasSortHandlerMethodArgumentResolver();
	}
	@Bean
	public HateoasPageableHandlerMethodArgumentResolver pageableResolver() {
		return new HateoasPageableHandlerMethodArgumentResolver(sortResolver());
	}
	@Bean
	public PagedResourcesAssembler<?> pagedResourcesAssembler() {
		return new PagedResourcesAssembler<>(pageableResolver(), null);
	}

}
