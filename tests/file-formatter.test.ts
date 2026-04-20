import { describe, it, expect, vi, beforeEach } from "vitest";
import { sendResponse, sendErrorResponse, sendSuccessResponse } from "../src/file-formatter";

/**
 * Creates a mock Express Response object.
 */
function createMockResponse() {
  const res: any = {
    statusCode: 200,
    body: null,
    status(code: number) {
      res.statusCode = code;
      return res;
    },
    json(data: any) {
      res.body = data;
      return res;
    },
  };

  vi.spyOn(res, "status");
  vi.spyOn(res, "json");

  return res;
}

// ─── sendResponse ────────────────────────────────────────────

describe("sendResponse", () => {
  let res: ReturnType<typeof createMockResponse>;

  beforeEach(() => {
    res = createMockResponse();
  });

  it("should send a response with all fields", () => {
    sendResponse(res, 200, true, "OK", { id: 1 });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      status: 200,
      message: "OK",
      data: { id: 1 },
    });
  });

  it("should set data to null when data is not provided", () => {
    sendResponse(res, 404, false, "Not found");

    expect(res.body).toEqual({
      success: false,
      status: 404,
      message: "Not found",
      data: null,
    });
  });

  it("should preserve falsy data values (0, empty string, false)", () => {
    sendResponse(res, 200, true, "Zero", 0);
    expect(res.body.data).toBe(0);

    sendResponse(res, 200, true, "Empty", "");
    expect(res.body.data).toBe("");

    sendResponse(res, 200, true, "False", false);
    expect(res.body.data).toBe(false);
  });

  it("should handle null data explicitly passed", () => {
    sendResponse(res, 200, true, "Null data", null);
    expect(res.body.data).toBeNull();
  });

  it("should handle array data", () => {
    const items = [1, 2, 3];
    sendResponse(res, 200, true, "List", items);
    expect(res.body.data).toEqual([1, 2, 3]);
  });

  it("should handle nested object data", () => {
    const data = { user: { name: "John", roles: ["admin"] } };
    sendResponse(res, 200, true, "Nested", data);
    expect(res.body.data).toEqual(data);
  });
});

// ─── sendErrorResponse ──────────────────────────────────────

describe("sendErrorResponse", () => {
  let res: ReturnType<typeof createMockResponse>;

  beforeEach(() => {
    res = createMockResponse();
  });

  it("should send error with custom status and message", () => {
    sendErrorResponse(res, 400, "Bad request");

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.body).toEqual({
      success: false,
      status: 400,
      message: "Bad request",
      data: null,
    });
  });

  it("should default to 500 and 'Server error'", () => {
    sendErrorResponse(res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.body).toEqual({
      success: false,
      status: 500,
      message: "Server error",
      data: null,
    });
  });

  it("should always set success to false", () => {
    sendErrorResponse(res, 403, "Forbidden");
    expect(res.body.success).toBe(false);
  });

  it("should always set data to null", () => {
    sendErrorResponse(res, 422, "Validation failed");
    expect(res.body.data).toBeNull();
  });
});

// ─── sendSuccessResponse ────────────────────────────────────

describe("sendSuccessResponse", () => {
  let res: ReturnType<typeof createMockResponse>;

  beforeEach(() => {
    res = createMockResponse();
  });

  it("should send success with custom status, message and data", () => {
    const data = { user: { id: 1, name: "John Doe" } };
    sendSuccessResponse(res, 201, "Created", data);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.body).toEqual({
      success: true,
      status: 201,
      message: "Created",
      data,
    });
  });

  it("should default to 200 and 'Operation successful'", () => {
    sendSuccessResponse(res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.body).toEqual({
      success: true,
      status: 200,
      message: "Operation successful",
      data: null,
    });
  });

  it("should always set success to true", () => {
    sendSuccessResponse(res, 200, "Test");
    expect(res.body.success).toBe(true);
  });

  it("should handle data with special characters", () => {
    const data = { message: 'Hello "world" <script>alert(1)</script>' };
    sendSuccessResponse(res, 200, "OK", data);
    expect(res.body.data).toEqual(data);
  });
});

// ─── Response Structure ─────────────────────────────────────

describe("Response Structure", () => {
  let res: ReturnType<typeof createMockResponse>;

  beforeEach(() => {
    res = createMockResponse();
  });

  it("should always contain success, status, message, and data fields", () => {
    sendResponse(res, 200, true, "Test");
    const body = res.body;

    expect(body).toHaveProperty("success");
    expect(body).toHaveProperty("status");
    expect(body).toHaveProperty("message");
    expect(body).toHaveProperty("data");
  });

  it("status in body should match the HTTP status code", () => {
    sendResponse(res, 418, false, "I'm a teapot");
    expect(res.body.status).toBe(418);
    expect(res.statusCode).toBe(418);
  });
});
