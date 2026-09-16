import { describe, expect, it } from "vitest";
import { PcaValidator } from "@/src/application/pca/pca-validator";

const validator = new PcaValidator();

describe("PcaValidator", () => {
  it("accepts a valid item", () => {
    const result = validator.validate([
      {
        codigoCatalogo: "3.3.90.30.01.00.002.8935",
        quantidade: 10,
        valorEstimado: 250,
        dataDesejada: new Date("2027-03-01T00:00:00.000Z"),
      },
    ]);

    expect(result.valid).toBe(true);
    expect(result.issues).toHaveLength(0);
  });

  it("blocks duplicated catalog codes", () => {
    const result = validator.validate([
      { codigoCatalogo: "ITEM-001" },
      { codigoCatalogo: "item-001" },
    ]);

    expect(result.valid).toBe(false);
    expect(result.issues.some((issue) => issue.field.includes("codigoCatalogo"))).toBe(true);
  });

  it("blocks non-positive quantities", () => {
    const result = validator.validate([
      { codigoCatalogo: "ITEM-001", quantidade: 0 },
    ]);

    expect(result.valid).toBe(false);
    expect(result.issues[0]?.field).toContain("quantidade");
  });

  it("blocks negative estimated values", () => {
    const result = validator.validate([
      { codigoCatalogo: "ITEM-001", valorEstimado: -1 },
    ]);

    expect(result.valid).toBe(false);
    expect(result.issues[0]?.field).toContain("valorEstimado");
  });

  it("blocks an empty import", () => {
    const result = validator.validate([]);

    expect(result.valid).toBe(false);
    expect(result.issues[0]?.field).toBe("planilha");
  });
});
