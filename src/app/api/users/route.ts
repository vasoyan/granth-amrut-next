// src/app/api/users/route.ts

import { create, getAll } from "@/services/usersService";
import { users } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "../../../models/apiResponse";
import { handleError } from "../../../helers/helper";

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
    const users: users[] = await getAll();
    return NextResponse.json<ApiResponse<users[]>>({
      status: 200,
      message: "Data fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    return handleError({ error });
  }
}

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     description: Add a new user to the database
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/users'
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
    const reqBody: users = await req.json();
    const detail: users | null = await create(reqBody);
    
    return NextResponse.json<ApiResponse<users>>({
      status: 201,
      message: "Data Inserted successfully",
      success: true,
      data: detail,
    });
  } catch (error) {
    return handleError({ error });
  }
}
