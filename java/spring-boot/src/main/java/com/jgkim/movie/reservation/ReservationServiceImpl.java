package com.jgkim.movie.reservation;

import com.jgkim.movie.discount.DiscountPolicy;
import com.jgkim.movie.discount.FixDiscountPolicy;
import com.jgkim.movie.member.MemberRepository;
import com.jgkim.movie.member.MemoryMemberRepository;

public class ReservationServiceImpl implements ReservationService {
    private final MemberRepository memberRepository = new MemoryMemberRepository();
    private final DiscountPolicy discountPolicy = new FixDiscountPolicy();

    @Override
    public Reservation createReservation(Long movieId, Long memberId) {
        `
    }
}
