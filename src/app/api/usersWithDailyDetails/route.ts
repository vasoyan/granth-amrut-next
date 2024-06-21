// src/app/api/users/route.ts

import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "../../../models/apiResponse";
import { handleError } from "../../../helers/helper";
import { getUsersWithDailyDetailsCount } from "@/services/dailydetailService";
import { Users } from "@/models/users";

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Data fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/apiResponse'
 */
export async function GET() {
  try {
    const users: Users[] = await getUsersWithDailyDetailsCount();
    return NextResponse.json<ApiResponse<Users[]>>({
      status: 200,
      message: "Data fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    return handleError({ error });
  }
}

