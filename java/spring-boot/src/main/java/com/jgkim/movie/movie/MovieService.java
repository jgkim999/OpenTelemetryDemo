package com.jgkim.movie.movie;

public interface MovieService {
    /**
     * 영화 조회
     *
     * @param movieId 영화 ID
     * @return 영화 정보
     */
    Movie findMovie(Long movieId);

    /**
     * 영화 등록
     *
     * @param movie 영화 정보
     */
    void registerMovie(Movie movie);

    /**
     * 영화 삭제
     *
     * @param movieId 영화 ID
     */
    void removeMovie(Long movieId);

    /**
     * 영화 정보 수정
     *
     * @param movie 영화 정보
     */
    void modifyMovie(Movie movie);
}
