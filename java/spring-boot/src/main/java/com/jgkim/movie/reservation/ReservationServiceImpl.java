package com.jgkim.movie.reservation;

import com.jgkim.movie.discount.DiscountPolicy;
import com.jgkim.movie.member.Member;
import com.jgkim.movie.member.MemberService;
import com.jgkim.movie.movie.Movie;
import com.jgkim.movie.movie.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class ReservationServiceImpl implements ReservationService {
    private final MovieService movieService;
    private final MemberService memberService;
    private final DiscountPolicy discountPolicy;

    @Autowired
    public ReservationServiceImpl(
            MovieService movieService,
            MemberService memberService,
            DiscountPolicy discountPolicy) {
        this.movieService = movieService;
        this.memberService = memberService;
        this.discountPolicy = discountPolicy;
    }

    @Override
    public Reservation createReservation(Long movieId, Long memberId) {
        Member member = memberService.findMember(memberId);
        if (member == null) {
            throw new IllegalArgumentException("Member not found");
        }
        Movie movie = movieService.findMovie(movieId);
        if (movie == null) {
            throw new IllegalArgumentException("Movie not found");
        }
        var discountPrice = discountPolicy.discount(member, movie.getPrice());
        long reservationNumber = Math.abs(UUID.randomUUID().getMostSignificantBits());

        return new Reservation(reservationNumber, member.getId(), movie.getId(), movie.getPrice(), discountPrice);
    }
}
