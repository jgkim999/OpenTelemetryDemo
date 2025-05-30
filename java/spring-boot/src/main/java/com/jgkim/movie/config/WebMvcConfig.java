package com.jgkim.movie.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    private final ControllerMetricsInterceptor controllerMetricsInterceptor;

    public WebMvcConfig(ControllerMetricsInterceptor controllerMetricsInterceptor) {
        this.controllerMetricsInterceptor = controllerMetricsInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(controllerMetricsInterceptor);
    }
}