export interface ITravelLeg {
    origin         : string;
    destination    : string;
    departure_date : Date; // date and time UTC
    arrival_date   : Date; // date and time UTC
}

export interface ITravelAdditionalLegData {}

export interface ITravelPrice {
    price                 : number;
    provider              : string;
    refundable            : boolean;
    baggage_number        : number;
    additional_legs_data  : any[];
}

export interface ITravel {
    ekotrip_id       : string;
    leg_list_outward : ITravelLeg[];
    leg_list_return  : ITravelLeg[] | null;
    price_list       : ITravelPrice[];
    price_list_return : ITravelPrice[] | null;
}
