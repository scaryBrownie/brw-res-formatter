/**
 * brw-res-formatter
 *
 * A simple, type-safe response formatter for Express.js applications.
 * Provides standardized JSON responses for success and error cases.
 *
 * @packageDocumentation
 */

// Re-export all formatter functions
export { sendResponse, sendErrorResponse, sendSuccessResponse } from "./file-formatter";

// Re-export all types
export type { ApiResponse, ResponseOptions } from "./types";
