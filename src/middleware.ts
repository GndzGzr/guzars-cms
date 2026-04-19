export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    // NextAuth will protect all routes except these completely
    "/((?!login|signup|api|_next/static|_next/image|favicon.ico).*)",
  ],
};