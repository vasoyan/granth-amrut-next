import { errorResponse } from "@/models/errorResponse";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function handleError({
  error,
}: {
  error: any;
}): NextResponse<errorResponse> {
  if (error instanceof Error) {
    return NextResponse.json<errorResponse>(
      { error: error.message },
      { status: 500 }
    );
  } else {
    return NextResponse.json<errorResponse>(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    if (token) {
      const decodedToken: any = jwt.verify(token, process.env.AUTH_SECRET!);
      return decodedToken.id;
    }

    return null;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
