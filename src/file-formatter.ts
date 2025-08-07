export interface ResponseData {
  success: boolean;
  message: string;
  data?: any;
}

export function sendResponse(res: any, statusCode: number, success: boolean, message: string, data?: any): void {
  const responseData: ResponseData = {
    success,
    message,
    data,
  };
  res.status(statusCode).json(responseData);
}

export function sendErrorResponse(res: any, statusCode: number = 500, message: string = "Server error"): void {
  sendResponse(res, statusCode, false, message);
}

export function sendSuccessResponse(res: any, statusCode: number = 200, message: string = "Operation successful", data?: any): void {
  sendResponse(res, statusCode, true, message, data);
}