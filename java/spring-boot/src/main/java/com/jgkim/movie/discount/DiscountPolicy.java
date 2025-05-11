package com.jgkim.movie.discount;

import com.jgkim.movie.member.Member;

/**
 * 할인
 */
public interface DiscountPolicy {
    /**
     * @param member
     * @param price
     * @return
     */
    int discount(Member member, int price);
}
