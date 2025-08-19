import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (
          credentials?.email === "admin@naver.com" &&
          credentials?.password === "Test1234!"
        ) {
          return {
            id: "1",
            name: "Seung Jun Lee",
            email: "admin@naver.com",
            role: "admin",
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };

// import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
// import KakaoProvider from "next-auth/providers/kakao";
// GithubProvider({
//   clientId: process.env.GITHUB_ID as string,
//   clientSecret: process.env.GITHUB_SECRET as string,
// }),
// GoogleProvider({
//   clientId: process.env.GOOGLE_ID as string,
//   clientSecret: process.env.GOOGLE_SECRET as string,
// }),
// KakaoProvider({
//   clientId: process.env.KAKAO_ID as string,
//   clientSecret: process.env.KAKAO_SECRET as string,
// }),
