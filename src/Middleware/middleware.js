import { NextResponse } from "next/server";
import { getAuth } from "firebase/auth";

export function middleware(request) {
  const auth = getAuth();
  const user = auth.currentUser;

  const protectedRoutes = ["/dashboard"]; // Rutas protegidas
  const url = request.nextUrl.pathname;

  if (protectedRoutes.includes(url)) {
    if (!user) {
      return NextResponse.redirect(new URL("/", request.url)); // Redirigir a la página principal
    }
  }

  return NextResponse.next();
}
