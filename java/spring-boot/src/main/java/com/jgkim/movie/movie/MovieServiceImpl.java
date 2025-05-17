package com.jgkim.movie.movie;

public class MovieServiceImpl implements MovieService {
    private final MovieRepository movieRepository;

    public MovieServiceImpl(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }
    /**
     * 영화 조회
     *
     * @param movieId 영화 ID
     * @return 영화 정보
     */
    @Override
    public Movie findMovie(Long movieId) {
        return movieRepository.findById(movieId);
    }

    /**
     * 영화 등록
     *
     * @param movie 영화 정보
     */
    @Override
    public void registerMovie(Movie movie) {
        movieRepository.save(movie);
    }

    /**
     * 영화 삭제
     *
     * @param movieId 영화 ID
     */
    @Override
    public void removeMovie(Long movieId) {
        movieRepository.delete(movieId);
    }

    /**
     * 영화 정보 수정
     *
     * @param movie 영화 정보
     */
    @Override
    public void modifyMovie(Movie movie) {
        movieRepository.update(movie);
    }
}
