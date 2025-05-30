package com.jgkim.movie.reservation;

import com.google.gson.Gson;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Reservation {
    private Long reservationId;
    private Long memberId;
    private Long movieId;
    private int ticketPrice;
    private int discountPrice;

    public int calculatePrice() {
        return ticketPrice - discountPrice;
    }

    @Override
    public String toString() {
        return "Order{" + '\'' +
                "reservationId=" + reservationId + '\'' +
                ", memberId=" + memberId +
                ", movieId=" + movieId + '\'' +
                ", ticketPrice=" + ticketPrice  + '\'' +
                ", discountPrice=" + discountPrice + '\'' +
                "}";
    }

    public String toJson() {
        Gson gson = new Gson();
        return gson.toJson(this);
    }
}
