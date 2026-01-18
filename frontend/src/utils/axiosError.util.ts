import type { AxiosError } from "axios";


export function throwAxiosError(error: unknown): never {
  const err = error as AxiosError<{ error: string }>;
  console.error("errors  🚩", err);
  const message = err.message || "Something went wrong. Please try later.";

  const status = err.response?.status;
  const data = err.response?.data;

  throw new ApiError(message, status, data);
}

export class ApiError extends Error {
  status?: number;
  data?: unknown;

  constructor(message: string, status?: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}