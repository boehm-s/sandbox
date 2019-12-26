export interface Leg {
    carrier              : string;
    flight_num           : string;
    operating_carrier    : string;
    operating_flight_num : string;
    plane_type           : string;
    origin               : string;
    origin_terminal      : string;
    destination          : string;
    destination_terminal : string;
    departure_date       : Date; // date and time UTC
    arrival_date         : Date; // date and time UTC
    duration             : number;
}

export enum CabinRequested {
    economy_stops,
    economy,
    premiumEconomy_stops,
    premiumEconomy,
    business_stops,
    business
}

export interface FlightPriceLegData {
    flight_num : string;
    cabin      : string;
    carrier    : string;
}

export interface FlightPrice {
    flight_id       : string;
    price           : number;
    refundable      : boolean;
    baggage_number  : number;
    cabin_requested : CabinRequested;
    fligh_key       : string;
    provider        : string;
    legs_data       : FlightPriceLegData[];
}

export interface Flight {
    ekotrip_id : string;
    legList    : Leg[];
    priceList  : FlightPrice[];
}
