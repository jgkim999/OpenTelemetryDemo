package com.jgkim.movie.member;

import net.datafaker.Faker;
import org.springframework.stereotype.Component;

import java.util.HashMap;

/**
 * 사용자 관리 레포지토리 구현체
 */
@Component
public class MemoryMemberRepository implements MemberRepository {
    /**
     * 사용자 저장소
     */
    private static final HashMap<Long, Member> store = new HashMap<>();

    public MemoryMemberRepository() {
        Faker faker = new Faker();

        store.put(1L, new Member(1L, faker.name().fullName(), Grade.VIP));
        store.put(2L, new Member(2L, faker.name().fullName(), Grade.PLATINUM));
        store.put(3L, new Member(3L, faker.name().fullName(), Grade.GOLD));
        store.put(4L, new Member(4L, faker.name().fullName(), Grade.SILVER));
        store.put(5L, new Member(5L, faker.name().fullName(), Grade.BASIC));
    }

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
