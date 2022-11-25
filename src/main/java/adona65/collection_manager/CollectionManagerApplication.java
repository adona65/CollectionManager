package adona65.collection_manager;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Spring boot's main class that launch the application.
 * 
 * @author adona65
 */
@SpringBootApplication // Combine @Configuration, @EnableAutoConfiguration and @ComponentScan.
public class CollectionManagerApplication {

    private static final Logger logger = LoggerFactory.getLogger(SecurityConfiguration.class);
    
	public static void main(String[] args) {
	    logger.info("Will launch Spring's boot back-end part.");
		SpringApplication.run(CollectionManagerApplication.class, args);
		logger.info("Spring's boot back-end part launched.");
	}
}
