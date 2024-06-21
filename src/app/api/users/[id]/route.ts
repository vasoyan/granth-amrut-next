// src/app/api/users/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { users } from "@prisma/client";
import { ApiResponse } from "@/models/apiResponse";
import { handleError } from "@/helers/helper";
import { deleteById, getById, update } from "@/services/usersService";

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieve a user by its ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to retrieve
 *     responses:
 *       200:
 *         description: user fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: user not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
export async function GET(req: NextRequest, context: any) {
  const { params } = context;
  const id = parseInt(params.id, 10);

  try {
    const user: users | null = await getById(id);
    return NextResponse.json<ApiResponse<users>>({
      status: user ? 200 : 404,
      message: user ? "user fetched successfully" : "user not found",
      success: !!user,
      data: user,
    });
  } catch (error) {
    return handleError({ error });
  }
}

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     description: Update a user by its ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/users'
 *     responses:
 *       200:
 *         description: user updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: user not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
export async function PUT(req: NextRequest, context: any) {
  const { params } = context;
  const id = parseInt(params.id, 10);
  const reqBody: users = await req.json();

  try {
    const user: users | null = await update(id, reqBody);
    return NextResponse.json<ApiResponse<void>>({
      status: user ? 200 : 404,
      message: user ? "user updated successfully" : "user not found",
      success: !!user,
      data: null
    });
  } catch (error) {
    return handleError({ error });
  }
}

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete a user by its ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: user deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: user not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
export async function DELETE(req: NextRequest, context: any) {
  const { params } = context;
  const id = parseInt(params.id, 10);

  try {
    const user: users | null = await deleteById(id);
    return NextResponse.json<ApiResponse<void>>({
      status: user ? 200 : 404,
      message: user ? `user Id: ${id} deleted successfully` : "user not found",
      success: !!user,
      data: null
    });
  } catch (error) {
    return handleError({ error });
  }
}
