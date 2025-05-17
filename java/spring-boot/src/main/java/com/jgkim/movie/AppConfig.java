package com.jgkim.movie;

import com.jgkim.movie.discount.DiscountPolicy;
import com.jgkim.movie.discount.FixDiscountPolicy;
import com.jgkim.movie.member.MemberRepository;
import com.jgkim.movie.member.MemberService;
import com.jgkim.movie.member.MemberServiceImpl;
import com.jgkim.movie.member.MemoryMemberRepository;
import com.jgkim.movie.movie.MemoryMovieRepository;
import com.jgkim.movie.movie.MovieRepository;
import com.jgkim.movie.movie.MovieService;
import com.jgkim.movie.movie.MovieServiceImpl;
import com.jgkim.movie.reservation.ReservationService;
import com.jgkim.movie.reservation.ReservationServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    @Bean
    public MemberRepository memberRepository() {
        return new MemoryMemberRepository();
    }

    @Bean
    public MemberService memberService() {
        return new MemberServiceImpl(memberRepository());
    }

    @Bean
    MovieRepository movieRepository() {
        return new MemoryMovieRepository();
    }

    @Bean
    public MovieService movieService() {
        return new MovieServiceImpl(movieRepository());
    }

    @Bean
    public DiscountPolicy discountPolicy() {
        return new FixDiscountPolicy();
    }

    @Bean
    public ReservationService reservationService() {
        return new ReservationServiceImpl(movieService(), memberService(), discountPolicy());
    }
}
