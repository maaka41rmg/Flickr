import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Falta el token de reCAPTCHA" },
      { status: 400 }
    );
  }

  try {
    const SECRET_KEY = "6LfP474qAAAAJEaazxL87maGg5HtE_fgwtrzZ66_"; // Tu clave secreta correcta
    // Tu clave secreta de reCAPTCHA

    // Verificar el token con la API de Google
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      {},
      {
        params: {
          secret: secretKey,
          response: token,
        },
      }
    );

    const { success, "error-codes": errorCodes } = response.data;

    if (!success) {
      return NextResponse.json(
        { success: false, errors: errorCodes },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al verificar reCAPTCHA:", error);
    return NextResponse.json(
      { success: false, message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
