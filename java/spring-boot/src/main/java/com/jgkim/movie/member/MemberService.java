package com.jgkim.movie.member;
/**
 * 사용자 관리 서비스 인터페이스
 */
public interface MemberService {
    /**
     * 사용자 조회
     *
     * @param memberId 사용자 ID
     * @return 사용자 정보
     */
    Member findMember(Long memberId);
    /**
     * 사용자 등록
     *
     * @param member 사용자 정보
     */
    void registerMember(Member member);
    /**
     * 사용자 삭제
     *
     * @param memberId 사용자 ID
     */
    void removeMember(Long memberId);
    /**
     * 사용자 정보 수정
     *
     * @param member 사용자 정보
     */
    void modifyMember(Member member);
}
