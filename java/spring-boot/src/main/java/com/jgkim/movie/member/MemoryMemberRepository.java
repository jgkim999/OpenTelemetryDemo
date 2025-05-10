package com.jgkim.movie.member;

import java.util.HashMap;

/**
 * 사용자 관리 레포지토리 구현체
 */
public class MemoryMemberRepository implements MemberRepository {
    /**
     * 사용자 저장소
     */
    private static final HashMap<Long, Member> store = new HashMap<>();
    /**
     * 사용자 조회
     *
     * @param memberId 사용자 ID
     * @return 사용자 정보
     */
    @Override
    public Member findById(Long memberId) {
        return store.get(memberId);
    }
    /**
     * 사용자 등록
     *
     * @param member 사용자 정보
     */
    @Override
    public void save(Member member) {
        store.put(member.getId(), member);
    }
    /**
     * 사용자 삭제
     *
     * @param memberId 사용자 ID
     */
    @Override
    public void delete(Long memberId) {
        store.remove(memberId);
    }
    /**
     * 사용자 정보 수정
     *
     * @param member 사용자 정보
     */
    @Override
    public void update(Member member) {
        store.remove(member.getId());
        store.put(member.getId(), member);
    }
}
