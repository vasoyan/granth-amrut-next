// src/app/api/login/route.ts

import { login } from "@/services/usersService";
import { users } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "../../../../models/apiResponse";
import { handleError } from "../../../../helers/helper";
import jwt from "jsonwebtoken";

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login user
 *     description: Authenticate a user with username and password
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/login'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/apiResponse'
 *       400:
 *         description: Bad request (invalid JSON, missing fields, invalid credentials)
 *       401:
 *         description: Unauthorized (invalid username or password)
 *       500:
 *         description: Internal server error
 */
export async function POST(req: NextRequest) {
  try {
    const reqBody: users = await req.json();

    const userData: users | null = await login(
      reqBody.username,
      reqBody.userpass
    );

    if (!userData) {
      return NextResponse.json<ApiResponse<users>>({
        status: 400,
        message: "User does not exist",
        success: false,
        data: null,
      });
    }

    const tokenData = {
      id: userData.userid,
      username: userData.username,
      email: userData.useremail,
    };

    // Implement secure token generation (not included here)
    const token = await jwt.sign(tokenData, process.env.AUTH_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json<ApiResponse<users>>({
      status: !userData ? 401 : 200,
      message: !userData ? "Invalid username or password" : "Login successful",
      success: !userData,
      data: userData,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return handleError({ error });
  }
}
