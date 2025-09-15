package com.daniel.ecommerce.shared.security.config;

import com.daniel.ecommerce.shared.security.jwt.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.method.HandlerTypePredicate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {


    private final String[] allowedOrigins;
    private final String[] allowedMethods;
    private final String apiPrefix;

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(@Value("${application.cors.allowed-origins}") String[] allowedOrigins, @Value("${application.cors.allowed-methods}") String[] allowedMethods, @Value("${application.api.path.prefix}") String apiPrefix, JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.allowedOrigins = allowedOrigins;
        this.allowedMethods = allowedMethods;
        this.apiPrefix = apiPrefix;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf -> csrf.disable())
                .cors(cors -> {})
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(http -> {
                    // EndPoints publicos
                    http.requestMatchers(HttpMethod.POST, apiPrefix.concat("auth/**")).permitAll();
                    // permitir swagger
                    http.requestMatchers(
                            apiPrefix.concat("swagger-ui/**"),
                            apiPrefix.concat("docs/**"),
                            apiPrefix.concat("api-docs/**"),
                            apiPrefix.concat("swagger-resources/**"),
                            apiPrefix.concat("webjars/**"),
                            "swagger-ui/**"
                    ).permitAll();
                    // Product endpoints
                    http.requestMatchers(HttpMethod.GET, apiPrefix.concat("products")).permitAll()
                            .requestMatchers(HttpMethod.GET, apiPrefix.concat("products/*")).permitAll()
                            .requestMatchers(apiPrefix.concat("products/**")).hasRole("ADMIN");


                    // EndPoints Privados
                    //User endpoints
                    http.requestMatchers(HttpMethod.GET, apiPrefix.concat("users/me")).hasAnyRole("CLIENT", "ADMIN")
                            .requestMatchers(HttpMethod.PATCH, apiPrefix.concat("users/me")).hasAnyRole("CLIENT", "ADMIN")
                            //User Profile picture
                            .requestMatchers(HttpMethod.PATCH, apiPrefix.concat("users/me/profile-picture")).hasAnyRole("CLIENT", "ADMIN")
                            //Change password
                            .requestMatchers(HttpMethod.PATCH, apiPrefix.concat("users/me/change-password")).hasAnyRole("CLIENT", "ADMIN")
                            //User Address endpoints
                            .requestMatchers(HttpMethod.GET, apiPrefix.concat("users/me/user-addresses")).hasRole("CLIENT")
                            .requestMatchers(HttpMethod.POST, apiPrefix.concat("users/me/user-addresses")).hasRole("CLIENT")
                            .requestMatchers(HttpMethod.PATCH, apiPrefix.concat("users/me/user-addresses/*")).hasRole("CLIENT")
                            .requestMatchers(HttpMethod.DELETE, apiPrefix.concat("users/me/user-addresses/*")).hasRole("CLIENT")
                            .requestMatchers(apiPrefix.concat("users/**")).hasRole("ADMIN");

                    //Order endpoints
                    http.requestMatchers(HttpMethod.GET, apiPrefix.concat("orders/me")).hasRole("CLIENT")
                            .requestMatchers(HttpMethod.GET, apiPrefix.concat("orders/users/*")).hasRole("ADMIN")
                            .requestMatchers(HttpMethod.POST, apiPrefix.concat("orders/me")).hasRole("CLIENT")
                            .requestMatchers(HttpMethod.PATCH, apiPrefix.concat("orders/*/me")).hasRole("CLIENT")
                            .requestMatchers(HttpMethod.POST, apiPrefix.concat("orders/*/cancel/me")).hasRole("CLIENT");

                    //Invoice endpoints
                    http.requestMatchers(HttpMethod.GET, apiPrefix.concat("invoices/me")).hasRole("CLIENT")
                            .requestMatchers(HttpMethod.POST, apiPrefix.concat("invoices/create/orders/*/payment_method/*")).hasRole("CLIENT");


                    http.anyRequest().denyAll();
                })
                .addFilterBefore(jwtAuthenticationFilter, BasicAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public AuthenticationProvider authenticationProvider(UserDetailsService userDetailService) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder());
        provider.setUserDetailsService(userDetailService);
        return provider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void configurePathMatch(PathMatchConfigurer configurer) {
                // Prefijo global para todos los controllers
                configurer.addPathPrefix(apiPrefix,
                        HandlerTypePredicate.forAnnotation(RestController.class));
            }

            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping(apiPrefix.concat("**"))  // Apply CORS settings to all API endpoints
                        .allowedOrigins(allowedOrigins)
                        .allowedMethods(allowedMethods)
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
