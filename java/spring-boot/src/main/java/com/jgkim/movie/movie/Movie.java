package com.jgkim.movie.movie;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Movie {
    private Long id;
    private String title;
    private String director;
    private int price;
}
