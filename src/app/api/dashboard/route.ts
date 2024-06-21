// src/app/api/users/route.ts

import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "../../../models/apiResponse";
import { handleError } from "../../../helers/helper";
import { getDashboardCounts } from "@/services/dailydetailService";

import { DashboardCounts } from "@/models/dashboardCounts";

export async function GET() {
  try {
    const dashboardCounts: DashboardCounts = await getDashboardCounts();
    return NextResponse.json<ApiResponse<DashboardCounts>>({
      status: 200,
      message: "Data fetched successfully",
      success: true,
      data: dashboardCounts,
    });
  } catch (error) {
    return handleError({ error });
  }
}
