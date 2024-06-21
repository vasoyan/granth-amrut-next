// src/app/api/daily-detail/route.ts

import { create, getAllByCurrentUser } from "@/services/dailydetailService";
import { dailydetail } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "../../../models/apiResponse";
import { getDataFromToken, handleError } from "../../../helers/helper";

/**
 * @swagger
 * /api/daily-detail:
 *   get:
 *     summary: Get all details
 *     description: Retrieve a list of all details
 *     tags:
 *       - Daily-detail
 *     responses:
 *       200:
 *         description: Data fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    const details: dailydetail[] = await getAllByCurrentUser(
      userId == 1 ? "" : userId
    );
    return NextResponse.json<ApiResponse<dailydetail[]>>({
      status: 200,
      message: "Data fetched successfully",
      success: true,
      data: details,
    });
  } catch (error) {
    return handleError({ error });
  }
}

/**
 * @swagger
 * /api/daily-detail:
 *   post:
 *     summary: Create a new detail
 *     description: Add a new detail to the database
 *     tags:
 *       - Daily-detail
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/dailydetail'
 *     responses:
 *       201:
 *         description: Data inserted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
export async function POST(req: NextRequest) {
  try {
    const reqBody: dailydetail = await req.json();
    const detail: dailydetail | null = await create(reqBody);

    return NextResponse.json<ApiResponse<dailydetail>>({
      status: 201,
      message: "Data Inserted successfully",
      success: true,
      data: detail,
    });
  } catch (error) {
    return handleError({ error });
  }
}
