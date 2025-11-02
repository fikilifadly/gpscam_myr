export interface IndonesiaTimeLocation {
	datetime: string;
	zone: "WIB" | "WITA" | "WIT";
	latitude: number;
	longitude: number;
	altitude: number | null;
	address: string | null;
}
