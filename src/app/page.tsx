"use client";
import { SessionProvider } from "next-auth/react";
import LoginBtn from "./components/auth/LoginButton";

export default function Home() {
  return (
    <SessionProvider>
      <h1>Hello World</h1>
      <LoginBtn />
    </SessionProvider>
  );
}
