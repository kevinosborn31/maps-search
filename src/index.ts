import { AddressResult } from './interfaces/AddressResult';
import { getPlaceAutocomplete } from './maps-api';

export async function getAutoCompleteDetails(address: string): Promise<AddressResult[]> {
    const apiKey = process.env.TOMTOM_API_KEY || '';

    if (!apiKey) {
        throw new Error('API key is required');
    }
    
    const autocompleteResults = await getPlaceAutocomplete(apiKey, address);
    
    return autocompleteResults.map((result: AddressResult) => ({
        placeId: result.placeId,
        streetNumber: result.streetNumber,
        countryCode: result.countryCode,
        country: result.country,
        freeformAddress: result.freeformAddress,
        municipality: result.municipality,
    }));
}
