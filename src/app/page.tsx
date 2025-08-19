"use client";
import { SessionProvider } from "next-auth/react";
import LoginBtn from "./components/auth/LoginButton";

export default function Home() {
  return (
    <SessionProvider>
      <LoginBtn />
    </SessionProvider>
  );
}
