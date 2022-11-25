package adona65.collection_manager.controllers;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller of all services for set up an "Hello World" application.
 * 
 * @author adona65
 */
@CrossOrigin(origins="http://localhost:4200") // Allow Cross call from Angular's front-end part.
@RestController // Combine @Controller and @ResponseBody. 
public class HelloWorldController {
    
    private static final Logger logger = LoggerFactory.getLogger(HelloWorldController.class);

    @GetMapping("/resource")
    public Map<String, Object> home() {
        logger.info("Called : HelloWorldController/resource");
        
        Map<String, Object> model = new HashMap<String, Object>();
        model.put("id", UUID.randomUUID().toString());
        model.put("content", "Hello collection's World");
        return model;
    }
    
    /**
     * This is a useful trick in a Spring Security application. If the "/user" resource is reachable then it will return 
     * the currently authenticated user (an Authentication), and otherwise Spring Security will intercept the request and 
     * send a 401 response through an AuthenticationEntryPoint.
     */
    @GetMapping("/user")
    public Principal user(Principal user) {
        logger.info("Called : HelloWorldController/user"); 
        
        if(user == null) {
            logger.info("Will return null user.");  
        }
        
      return user;
    }
}
