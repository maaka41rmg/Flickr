import { NextResponse } from "next/server";
import { getAuth } from "firebase/auth";
/* eslint-disable @typescript-eslint/no-unused-vars*/
/* eslint-disable @typescript-eslint/no-explicit-any */
export function middleware(request) {
  const auth = getAuth();
  const user = auth.currentUser;

  const protectedRoutes = ["/inicio", "/dashboard"]; // Rutas protegidas
  const url = request.nextUrl.pathname;

  if (protectedRoutes.includes(url)) {
    if (!user) {
      return NextResponse.redirect(new URL("/", request.url)); // Redirigir a la página principal
    }
  }

  return NextResponse.next();
}
/* eslint-disable @typescript-eslint/no-unused-vars*/
/* eslint-disable @typescript-eslint/no-explicit-any */