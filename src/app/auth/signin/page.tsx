import AuthHeader from "@/components/auth/AuthHeader";
import SignIn from "@/components/auth/SignIn";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <AuthHeader />
      <SignIn />
    </div>
  );
}
