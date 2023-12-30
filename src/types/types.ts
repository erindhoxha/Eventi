type Category = {
 alias: string;
 title: string;
};

type Coordinates = {
 latitude: number;
 longitude: number;
};

type OpenHour = {
 hours_type: string;
 is_open_now: boolean;
 open: any[]; // Replace with the actual type of the array elements if known
};

type Location = {
 address1: string;
 address2: null | string;
 address3: string;
 city: string;
 country: string;
 cross_streets: string;
 display_address: string[];
 state: string;
 zip_code: string;
};

export type Venue = {
 alias: string;
 categories: Category[];
 coordinates: Coordinates;
 display_phone: string;
 hours: OpenHour[];
 id: string;
 image_url: string;
 is_claimed: boolean;
 is_closed: boolean;
 location: Location;
 name: string;
 phone: string;
 photos: string[];
 price: string;
 rating: number;
 review_count: number;
 transactions: string[];
 url: string;
};
