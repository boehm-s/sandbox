import {
    ITravel,
    ITravelLeg,
    ITravelPrice,
    ITravelAdditionalLegData } from './../Travels/Travel';

export interface TrainLeg extends ITravelLeg {
    transporter: string;
    train_num: string;
}

export interface TrainPriceLegData extends ITravelAdditionalLegData {
    cabin: string;
}

export interface TrainPrice extends ITravelPrice {
    ekotrip_id           : string;
    additional_legs_data : TrainPriceLegData[];
}

export interface Train {
    leg_list_outward : TrainLeg[];
    leg_list_return  : TrainLeg[] | null;
    price_list       : TrainPrice[];
}
