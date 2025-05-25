package com.jgkim.movie.config;

import io.opentelemetry.api.common.AttributeKey;
import io.opentelemetry.api.common.Attributes;
import io.opentelemetry.api.metrics.LongCounter;
import io.opentelemetry.api.metrics.Meter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class ControllerMetricsInterceptor implements HandlerInterceptor {

    private final LongCounter requestCounter;

    public ControllerMetricsInterceptor(Meter meter) {
        this.requestCounter = meter.counterBuilder("http.server.requests.count")
                .setDescription("Count of HTTP server requests")
                .build();
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        if (handler instanceof HandlerMethod) {
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            String controllerName = handlerMethod.getBeanType().getSimpleName();
            String methodName = handlerMethod.getMethod().getName();
            String endpoint = request.getRequestURI();
            String method = request.getMethod();

            Attributes attributes = Attributes.builder()
                    .put(AttributeKey.stringKey("controller"), controllerName)
                    .put(AttributeKey.stringKey("method"), methodName)
                    .put(AttributeKey.stringKey("endpoint"), endpoint)
                    .put(AttributeKey.stringKey("http.method"), method)
                    .build();
            requestCounter.add(1, attributes);
        }
        return true;
    }
}
