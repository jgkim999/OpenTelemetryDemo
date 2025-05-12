package com.jgkim.movie.reservation;

import com.jgkim.movie.discount.DiscountPolicy;
import com.jgkim.movie.discount.FixDiscountPolicy;
import com.jgkim.movie.member.*;
import com.jgkim.movie.movie.Movie;
import com.jgkim.movie.movie.MovieService;
import com.jgkim.movie.movie.MovieServiceImpl;

import java.util.UUID;

public class ReservationServiceImpl implements ReservationService {
    private final MovieService movieService = new MovieServiceImpl();
    private final MemberService memberService = new MemberServiceImpl();
    private final DiscountPolicy discountPolicy = new FixDiscountPolicy();

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
