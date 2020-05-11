import {
    ITravel,
    ITravelLeg,
    ITravelPrice,
    ITravelAdditionalLegData } from './../Travels/Travel';

export enum CabinRequested {
    economy_stops,
    economy,
    premiumEconomy_stops,
    premiumEconomy,
    business_stops,
    business
}

export interface FlightLeg extends ITravelLeg {
    carrier              : string;
    flight_num           : string;
    operating_carrier    : string;
    operating_flight_num : string;
    origin_terminal      : string;
    destination_terminal : string;
    plane_type           : string;
    duration?            : number;
}

export interface FlightPriceLegData extends ITravelAdditionalLegData {
    cabin      : string;
    flight_num : string;
    carrier    : string;
}

export interface FlightPrice extends ITravelPrice {
    ekotrip_id           : string;
    fligh_key            : string;
    cabin_requested      : CabinRequested;
    additional_legs_data : FlightPriceLegData[];
}

export interface Flight extends ITravel {
    leg_list_outward : FlightLeg[];
    leg_list_return  : FlightLeg[] | null;
    price_list       : FlightPrice[];
}
