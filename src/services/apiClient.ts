import { ApiResponse } from "../models/apiResponse"; // Import the ApiResponse model or adjust the import path accordingly

const BASE_URL = "/api"; // Replace with your API base URL

export const ApiClient = {
  async get<T>(endpoint: string): Promise<ApiResponse<T | null>> {
    return this.request<T | null>("GET", endpoint);
  },

  async getById<T>(
    endpoint: string,
    id: number | string
  ): Promise<ApiResponse<T | null>> {
    return this.get<T | null>(`${endpoint}/${id}`);
  },

  async getByUserId<T>(
    endpoint: string,
    userId: number | string
  ): Promise<ApiResponse<T | null>> {
    return this.get<T | null>(`${endpoint}/userid/${userId}`);
  },

  async post<T>(
    endpoint: string,
    payload: any
  ): Promise<ApiResponse<T | null>> {
    return this.request<T | null>("POST", endpoint, payload);
  },

  async put<T>(endpoint: string, payload: any): Promise<ApiResponse<T | null>> {
    return this.request<T | null>("PUT", endpoint, payload);
  },

  async delete<T>(endpoint: string): Promise<ApiResponse<T | null>> {
    return this.request<T | null>("DELETE", endpoint);
  },

  async request<T>(
    method: string,
    endpoint: string,
    payload?: any
  ): Promise<ApiResponse<T | null>> {
    const url = `${BASE_URL}/${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: payload ? JSON.stringify(payload) : undefined,
      });
      
      const responseData = await response.json();

      if (response.ok) {
        return {
          success: true,
          status: responseData.statusCode,
          message: responseData.message,
          data: responseData.data || null,
          //   errors: {},
          //   pagination: responseData.pagination, // Adjust the property name if needed
        };
      } else {
        return {
          success: false,
          status: responseData.statusCode,
          message: responseData.message || "Operation failed!",
          data: null,
          //   errors: responseData.errors || {},
          //   pagination: null,
        };
      }
    } catch (error) {
      return {
        success: false,
        status: 500,
        message: "An error occurred while making the API call.",
        data: null,
        // errors: {},
        // pagination: null,
      };
    }
  },
};
