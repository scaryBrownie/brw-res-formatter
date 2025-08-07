function sendResponse(res, statusCode, success, message, data) {
  res.status(statusCode).json({
    success: success,
    message: message,
    data: data || null,
  });
}

function sendErrorResponse(res, statusCode = 500, message = "Server error") {
  res.status(statusCode).json({
    success: false,
    message: message,
    data: null,
  });
}

function sendSuccessResponse(
  res,
  statusCode = 200,
  message = "Operation successful",
  data
) {
  res.status(statusCode).json({
    success: true,
    message: message,
    data: data || null,
  });
}

export { sendResponse, sendErrorResponse, sendSuccessResponse };
