package com.jgkim.movie.movie;

import net.datafaker.Faker;

import java.util.HashMap;

public class MemoryMovieRepository implements MovieRepository {
    private static final HashMap<Long, Movie> store = new HashMap<>();

    public MemoryMovieRepository() {
        Faker faker = new Faker();
        store.put(1L, new Movie(1L, faker.movie().name(), faker.book().author(), faker.number().numberBetween(1000, 20000)));
        store.put(2L, new Movie(2L, faker.movie().name(), faker.book().author(), faker.number().numberBetween(1000, 20000)));
        store.put(3L, new Movie(3L, faker.movie().name(), faker.book().author(), faker.number().numberBetween(1000, 20000)));
        store.put(4L, new Movie(4L, faker.movie().name(), faker.book().author(), faker.number().numberBetween(1000, 20000)));
        store.put(5L, new Movie(5L, faker.movie().name(), faker.book().author(), faker.number().numberBetween(1000, 20000)));
    }
    
    /**
     * @param movieId
     * @return
     */
    @Override
    public Movie findById(Long movieId) {
        return store.get(movieId);
    }

    /**
     * @param movie
     */
    @Override
    public void save(Movie movie) {
        store.put(movie.getId(), movie);
    }

    /**
     * @param movieId
     */
    @Override
    public void delete(Long movieId) {
        store.remove(movieId);
    }

    /**
     * @param movie
     */
    @Override
    public void update(Movie movie) {
        store.remove(movie.getId());
        store.put(movie.getId(), movie);
    }
}
