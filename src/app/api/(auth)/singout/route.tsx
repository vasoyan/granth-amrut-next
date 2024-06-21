import { ApiResponse } from "@/models/apiResponse";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json<ApiResponse<null>>({
      status: 200,
      message: "Singout successfully",
      success: true,
      data: null,
    });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
