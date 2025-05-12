package com.jgkim.movie.movie;

public interface MovieRepository {
    Movie findById(Long movieId);
    void save(Movie movie);
    void delete(Long movieId);
    void update(Movie movie);
}
