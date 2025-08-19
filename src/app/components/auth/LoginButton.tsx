"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

export default function LoginBtn() {
  const { data: session } = useSession();

  if (session) {
    return (
      <section>
        <h2>{session.user?.name}님 로그인을 성공적으로 진행되었습니다.</h2>
        <button onClick={() => signOut()}>로그아웃</button>
      </section>
    );
  }

  return (
    <section>
      <h2>관리자 페이지에 오신 것을 환영합니다.</h2>
      <button onClick={() => signIn()}>로그인</button>
    </section>
  );
}
