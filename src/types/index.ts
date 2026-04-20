import type { Response } from "express";

/**
 * Standard API response structure returned by all formatter functions.
 */
export interface ApiResponse<T = unknown> {
  /** Whether the operation was successful */
  success: boolean;
  /** HTTP status code */
  status: number;
  /** Human-readable message describing the result */
  message: string;
  /** Optional payload data (null when absent) */
  data: T | null;
}

/**
 * Options for the sendResponse function.
 */
export interface ResponseOptions<T = unknown> {
  res: Response;
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
}

export type { Response };
