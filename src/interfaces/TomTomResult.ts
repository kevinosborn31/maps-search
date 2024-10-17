export interface TomTomResult {
    id: string;
    address: {
        streetNumber: string;
        countryCode: string;
        country: string;
        freeformAddress: string;
        municipality: string;
    };
}