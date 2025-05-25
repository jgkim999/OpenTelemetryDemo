package com.jgkim.movie.movie;

import io.opentelemetry.api.trace.Span;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class MovieController {
    private final MovieService movieService;

    @GetMapping("/movies")
    List<Movie> all() {
        String spanId = Span.current().getSpanContext().getSpanId();
        log.info("Request received for all movies. Trace SpanId: {}", spanId);
        List<Movie> movies = this.movieService.findAll();
        log.info("Returning {} movies. Trace SpanId: {}", movies.size(), spanId);
        return movies;
    }

    @GetMapping("/movie/{id}")
    Movie one(@PathVariable("id") Long id) {
        String spanId = Span.current().getSpanContext().getSpanId();
        log.info("Request received for movie with id: {}. Trace SpanId: {}", id, spanId);
        Movie movie = this.movieService.findMovie(id);
        log.info("Returning movie: {}. Trace SpanId: {}", movie.getTitle(), spanId);
        return movie;
    }
}
