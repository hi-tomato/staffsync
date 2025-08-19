"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email("올바른 이메일을 입력해주세요."),
  password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
});

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (remember) {
      localStorage.setItem("savedEmail", values.email);
    } else {
      localStorage.removeItem("savedEmail");
    }

    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
    });

    if (result?.ok) {
      window.location.href = "/";
    } else {
      console.error(result?.error);
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      form.setValue("email", savedEmail);
      setRemember(true);
    }
  }, [form]);

  return (
    <div className="min-h-screen flex">
      {/* 좌측 배경 영역 */}
      <div className="hidden lg:flex lg:w-1/3 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex items-center justify-center w-full">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">StaffSync</h1>
            <p className="text-xl opacity-90">
              관리자 대시보드에 오신 것을 환영합니다
            </p>
          </div>
        </div>
      </div>

      {/* 우측 로그인 폼 */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl font-bold text-gray-800">
              로그인
            </CardTitle>
            <p className="text-gray-600 mt-2">계정에 로그인하여 계속하세요</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  이메일
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    placeholder="이메일을 입력하세요"
                    type="email"
                    className="pl-10 h-12"
                    {...form.register("email")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  비밀번호
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    placeholder="비밀번호를 입력하세요"
                    type={showPassword ? "text" : "password"}
                    className="pl-10 pr-10 h-12"
                    {...form.register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(checked) => setRemember(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm text-gray-700">
                  아이디 기억하기
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium"
              >
                로그인
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
