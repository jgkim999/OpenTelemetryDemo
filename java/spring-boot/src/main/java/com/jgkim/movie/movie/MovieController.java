package com.jgkim.movie.movie;

import io.opentelemetry.api.trace.Span;
import io.opentelemetry.instrumentation.annotations.WithSpan;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class MovieController {
    private final MovieService movieService;
    private static final Logger logger = LoggerFactory.getLogger(MovieController.class);

    @WithSpan
    @GetMapping("/movies")
    List<Movie> all() {
        try {
            String spanId = Span.current().getSpanContext().getSpanId();
            log.info("Request received for all movies. Trace SpanId: {}", spanId);
            List<Movie> movies = this.movieService.findAll();
            log.info("Returning {} movies. Trace SpanId: {}", movies.size(), spanId);

            logger.trace("This is a TRACE message.");
            logger.debug("This is a DEBUG message.");
            logger.info("This is an INFO message.");
            logger.warn("This is a WARN message.");
            logger.error("This is an ERROR message.");

            MDC.put("traceId", spanId);
            MDC.put("size", String.valueOf(movies.size()));
            logger.info("Request processed successfully");

            return movies;
        } finally {
            MDC.clear();
        }
    }

    @WithSpan
    @GetMapping("/movie/{id}")
    Movie one(@PathVariable("id") Long id) {
        try {
            String spanId = Span.current().getSpanContext().getSpanId();
            log.info("Request received for movie with id: {}. Trace SpanId: {}", id, spanId);
            Movie movie = this.movieService.findMovie(id);

            MDC.put("movieTitle", movie.getTitle());
            MDC.put("movieId", id.toString());
            log.info("Returning movie: {}", spanId);
            return movie;
        } finally {
            MDC.clear();
        }
    }
}
