import { describe, it, expect } from "vitest";
import * as pkg from "../src/index";

describe("Package Exports (index.ts)", () => {
  it("should export sendResponse function", () => {
    expect(typeof pkg.sendResponse).toBe("function");
  });

  it("should export sendErrorResponse function", () => {
    expect(typeof pkg.sendErrorResponse).toBe("function");
  });

  it("should export sendSuccessResponse function", () => {
    expect(typeof pkg.sendSuccessResponse).toBe("function");
  });

  it("should not export any unexpected members", () => {
    const exportedKeys = Object.keys(pkg);
    expect(exportedKeys).toEqual(
      expect.arrayContaining([
        "sendResponse",
        "sendErrorResponse",
        "sendSuccessResponse",
      ]),
    );
    // Only functions should be exported (types are compile-time only)
    expect(exportedKeys.length).toBe(3);
  });
});
