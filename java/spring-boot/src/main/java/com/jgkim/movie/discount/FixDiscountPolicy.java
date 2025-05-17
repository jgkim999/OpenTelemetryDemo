package com.jgkim.movie.discount;

import com.jgkim.movie.member.Member;
import org.springframework.stereotype.Component;

@Component
public class FixDiscountPolicy implements DiscountPolicy {
    private final int discountFixAmount;
    {
        discountFixAmount = 1000;
    }

    @Override
    public int discount(Member member, int price) {
        int discountAmount = discountFixAmount;
        switch (member.getGrade()) {
            case BASIC:
                discountAmount -= 800;
                break;
            case SILVER:
                discountAmount -= 600;
                break;
            case GOLD:
                discountAmount -= 400;
                break;
            case PLATINUM:
                discountAmount -= 200;
                break;
            case VIP:
                break;
            default:
                discountAmount = 0;
                break;
        }
        if (price - discountFixAmount <= 0)
           return 0;
        return discountAmount;
    }
}
