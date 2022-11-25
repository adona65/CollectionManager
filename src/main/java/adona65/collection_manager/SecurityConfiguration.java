package adona65.collection_manager;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

/**
 * This is a standard Spring Boot application with Spring Security customization, just allowing anonymous access 
 * to the static (HTML) resources. The HTML resources need to be available to anonymous users, not just ignored 
 * by Spring Security.
 * 
 * The last thing we need to remember is to make the JavaScript components provided by Angular available anonymously 
 * to the application. We could do that in the HttpSecurity configuration below.
 * 
 * @author adona65
 */
@Configuration
public class SecurityConfiguration {
    
    private static final Logger logger = LoggerFactory.getLogger(SecurityConfiguration.class);
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        logger.info("Will perform all Spring security's configurations.");
        
        http.cors()
        .and()
            .authorizeRequests()
            .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
            .anyRequest().authenticated()
        .and()
            .httpBasic()
        /*
         * Without following, Angular's logout link wouldn't work because Spring Security’s built-in CSRF protection would
         * kicked it. All it wants is a token sent to it in a header called "X-CSRF". The value of the CSRF token is available 
         * server side in the HttpRequest attributes from the initial request that loaded the home page. To get it to the client
         * we could send it as a cookie. It's the best choice because Angular has built in support for CSRF (which it calls "XSRF") 
         * based on cookies.
         * 
         * So on the server we need a custom filter that will send the cookie. Angular wants the cookie name to be "XSRF-TOKEN" and 
         * Spring Security provides it as a request attribute by default, so we just need to transfer the value from a request attribute 
         * to a cookie. Fortunately, Spring Security (since 4.1.0) provides a special CsrfTokenRepository that does precisely this.
         * 
         * With this in place we don’t need to do anything on the client side and the login form is working.
         */
        .and()
            .csrf()
            .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
         .and()
             .exceptionHandling()
             .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
            ;
        
        return http.build();
    }
}
