import { config } from "dotenv";
import { describe } from "@jest/globals";
import { getPlaceAutocomplete } from "../src/maps-api";
import { getAutoCompleteDetails } from "../src";
import { AddressResult } from "../src/interfaces/AddressResult";

config();

const apiKey = process.env.TOMTOM_API_KEY;

if (!apiKey) {
  throw new Error("TOMTOM_API_KEY is not defined in the .env file");
}

describe("Tomtom Places E2E Tests", () => {
  describe("getAutoCompleteDetails", () => {
    it("returns a promise", () => {
      const res = getAutoCompleteDetails("123 main st");
      expect(res).toBeInstanceOf(Promise);
    });

    it("can fetch from the autocomplete api", async () => {
      const res = await getAutoCompleteDetails("123 main st");
      const firstRes = res[0];
      expect(firstRes).toHaveProperty("placeId");
      expect(firstRes).toHaveProperty("streetNumber");
      expect(firstRes).toHaveProperty("countryCode");
      expect(firstRes).toHaveProperty("country");
      expect(firstRes).toHaveProperty("freeformAddress");
      expect(firstRes).toHaveProperty("municipality");
    });

    it("returns results in the correct format", async () => {
      const res = await getAutoCompleteDetails("123 main st");
      expect(res).toBeInstanceOf(Array);
      expect(res[0]).toMatchObject<AddressResult>({
        placeId: expect.any(String),
        streetNumber: expect.any(String),
        countryCode: expect.any(String),
        country: expect.any(String),
        freeformAddress: expect.any(String),
        municipality: expect.any(String),
      });
    });
  });

  describe("getPlaceAutocomplete", () => {
    it("handles no results", async () => {
      const res = await getPlaceAutocomplete(apiKey, "asfasffasfasafsafs");
      expect(res).toStrictEqual([]);
    });

    it("handles error", async () => {
      expect(getPlaceAutocomplete(apiKey, "")).rejects.toThrow();
    });
    it("returns only Australian addresses", async () => {
      const res = await getPlaceAutocomplete(apiKey, "123 main st");
      res.forEach((address) => {
        expect(address.countryCode).toBe("AU");
      });
    });
    it("returns results with all required fields", async () => {
      const res = await getAutoCompleteDetails("123 main st");
      expect(res).toHaveLength(100);
      const firstRes = res[0];
      expect(firstRes).toHaveProperty("placeId");
      expect(firstRes).toHaveProperty("streetNumber");
      expect(firstRes).toHaveProperty("countryCode");
      expect(firstRes).toHaveProperty("country");
      expect(firstRes).toHaveProperty("freeformAddress");
      expect(firstRes).toHaveProperty("municipality");
    });
  });
});
