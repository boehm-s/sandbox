import { Flight } from './../Flights/Flight';
import { Hotel } from './../Hotels/Hotel';
import { Train } from './../Trains/Train';

export type TripItem = Flight | Hotel | Train;

export interface Trip {
    tripItemList: TripItem;
}
