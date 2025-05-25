package com.jgkim.movie.config;

import io.opentelemetry.api.OpenTelemetry;
import io.opentelemetry.api.metrics.Meter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MetricsConfig {

    @Bean
    public Meter meter(OpenTelemetry openTelemetry) {
        return openTelemetry.getMeter("com.jgkim.movie");
    }
}