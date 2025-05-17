package com.jgkim.movie;

import com.jgkim.movie.member.MemberService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

@SpringBootTest
public class MemberServiceTest {
    ApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);
    MemberService memberService = ac.getBean("memberService", MemberService.class);

    @Test
    public void findMember() {
        var member1 = memberService.findMember(1L);
        Assertions.assertNotNull(member1);

        var member2 = memberService.findMember(2L);
        Assertions.assertNotNull(member2);

        var member3 = memberService.findMember(3L);
        Assertions.assertNotNull(member3);

        var member4 = memberService.findMember(4L);
        Assertions.assertNotNull(member4);
    }
}
