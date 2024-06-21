import { getDataFromToken } from "@/helers/helper";
import { ApiResponse } from "@/models/apiResponse";
import { getById } from "@/services/usersService";
import { users } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    if (!userId) {
      return NextResponse.json<ApiResponse<null>>({
        status: 401,
        message: "Unauthorized: No token found",
        success: false,
        data: null,
      });
    } else {
      const user: users | null = await getById(userId);

      return NextResponse.json<ApiResponse<users>>({
        status: user ? 200 : 404,
        message: user ? "User fetched successfully" : "User not found",
        success: !!user,
        data: user,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
