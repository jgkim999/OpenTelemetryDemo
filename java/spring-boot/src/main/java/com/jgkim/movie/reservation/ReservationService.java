package com.jgkim.movie.reservation;

public interface ReservationService {
    Reservation createReservation(Long movieId, Long memberId);
}
