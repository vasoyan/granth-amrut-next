// src/app/api/daily-detail/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getByUserId } from "@/services/dailydetailService";
import { dailydetail } from "@prisma/client";
import { ApiResponse } from "@/models/apiResponse";
import { handleError } from "@/helers/helper";

/**
 * @swagger
 * /api/daily-detail/{id}:
 *   get:
 *     summary: Get a detail by ID
 *     description: Retrieve a detail by its ID
 *     tags:
 *       - Daily-detail
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the detail to retrieve
 *     responses:
 *       200:
 *         description: Detail fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Detail not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
export async function GET(req: NextRequest, context: any) {
  const { params } = context;
  const userid = parseInt(params.userid, 10);

  try {
    const detail: dailydetail[] | null = await getByUserId(userid);
    return NextResponse.json<ApiResponse<dailydetail[]>>({
      status: detail ? 200 : 404,
      message: detail ? "Detail fetched successfully" : "Detail not found",
      success: !!detail,
      data: detail,
    });
  } catch (error) {
    return handleError({ error });
  }
}
