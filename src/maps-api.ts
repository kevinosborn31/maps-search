import axios from "axios";
import { TomTomResult } from "./interfaces/TomTomResult";

export async function getPlaceAutocomplete(key: string, address: string) {
  if (!address) {
    throw new Error("Address is required");
  }

  try {
    const encodedAddress = encodeURIComponent(address);

    const response = await axios.get(
      `https://api.tomtom.com/search/2/search/${encodedAddress}.json`,
      {
        params: {
          key,
          limit: 100,
          countrySet: "AU",
        },
      }
    );

    return response.data.results.map((result: TomTomResult) => ({
      placeId: result.id || '',
      streetNumber: result.address.streetNumber || '',
      countryCode: result.address.countryCode || '',
      country: result.address.country || '',
      freeformAddress: result.address.freeformAddress || '',
      municipality: result.address.municipality || '',
    }));
  } catch (error) {
    console.error("Error fetching place autocomplete:", error);
    throw error;
  }
}
