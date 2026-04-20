import type { Response, ApiResponse } from "./types";

/**
 * Sends a standardized JSON response.
 *
 * @param res - Express response object
 * @param statusCode - HTTP status code
 * @param success - Whether the operation was successful
 * @param message - Human-readable message
 * @param data - Optional payload data
 */
export function sendResponse<T = unknown>(
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data?: T,
): void {
  const body: ApiResponse<T> = {
    success,
    status: statusCode,
    message,
    data: data !== undefined ? data : null,
  };
  res.status(statusCode).json(body);
}

/**
 * Sends a standardized error response.
 *
 * @param res - Express response object
 * @param statusCode - HTTP status code (default: 500)
 * @param message - Error message (default: "Server error")
 */
export function sendErrorResponse(
  res: Response,
  statusCode: number = 500,
  message: string = "Server error",
): void {
  sendResponse(res, statusCode, false, message);
}

/**
 * Sends a standardized success response.
 *
 * @param res - Express response object
 * @param statusCode - HTTP status code (default: 200)
 * @param message - Success message (default: "Operation successful")
 * @param data - Optional payload data
 */
export function sendSuccessResponse<T = unknown>(
  res: Response,
  statusCode: number = 200,
  message: string = "Operation successful",
  data?: T,
): void {
  sendResponse(res, statusCode, true, message, data);
}