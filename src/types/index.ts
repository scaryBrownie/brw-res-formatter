// This file defines TypeScript interfaces or types that may be used throughout the project.

export interface ResponseData {
  success: boolean;
  message: string;
  data?: any; //optional
}

export interface ErrorResponse {
  statusCode: number;
  message: string;
}
