// src/app/api/daily-detail/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { deleteById, getById, update } from "@/services/dailydetailService";
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
  const detailId = parseInt(params.id, 10);

  try {
    const detail: dailydetail | null = await getById(detailId);
    return NextResponse.json<ApiResponse<dailydetail>>({
      status: detail ? 200 : 404,
      message: detail ? "Detail fetched successfully" : "Detail not found",
      success: !!detail,
      data: detail,
    });
  } catch (error) {
    return handleError({ error });
  }
}

/**
 * @swagger
 * /api/daily-detail/{id}:
 *   put:
 *     summary: Update a detail by ID
 *     description: Update a detail by its ID
 *     tags:
 *       - Daily-detail
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the detail to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/dailydetail'
 *     responses:
 *       200:
 *         description: Detail updated successfully
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
export async function PUT(req: NextRequest, context: any) {
  const { params } = context;
  const detailId = parseInt(params.id, 10);
  const reqBody: dailydetail = await req.json();
  try {
    const detail: dailydetail | null = await update(detailId, reqBody);
    return NextResponse.json<ApiResponse<dailydetail>>({
      status: detail ? 200 : 404,
      message: detail ? "Detail updated successfully" : "Detail not found",
      success: !!detail,
      data: null,
    });
  } catch (error) {
    return handleError({ error });
  }
}

/**
 * @swagger
 * /api/daily-detail/{id}:
 *   delete:
 *     summary: Delete a detail by ID
 *     description: Delete a detail by its ID
 *     tags:
 *       - Daily-detail
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the detail to delete
 *     responses:
 *       200:
 *         description: Detail deleted successfully
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
export async function DELETE(req: NextRequest, context: any) {
  const { params } = context;
  const detailId = parseInt(params.id, 10);

  try {
    const detail: dailydetail | null = await deleteById(detailId);
    console.log(detail);
    return NextResponse.json<ApiResponse<dailydetail>>({
      status: detail ? 200 : 404,
      message: detail
        ? `Detail Id: ${detailId} deleted successfully`
        : "Detail not found",
      success: !!detail,
      data: null,
    });
  } catch (error) {
    return handleError({ error });
  }
}
