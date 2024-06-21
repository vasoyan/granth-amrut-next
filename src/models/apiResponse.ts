export type ApiResponse<T> = {
  status: number;
  message: string;
  success: boolean;
  data: T | null;
};
