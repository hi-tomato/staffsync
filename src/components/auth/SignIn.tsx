"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>관리자 페이지</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Label title="Email">Email</Label>
            <Input
              placeholder="Your email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Label title="Password">Password</Label>
            <Input
              placeholder="Your PassWord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
        </CardContent>
        <CardFooter>
          <Button variant={"secondary"}>Login</Button>
        </CardFooter>
      </Card>
    </section>
  );
}
