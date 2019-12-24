import { Observable }        from 'rxjs/Observable';
import { AbstractProvider }  from '../AbstractProvider';
import { Flight }            from '../../Flights/Flight'

interface FlightSearchParams {
    origin        : string;
    destination   : string;
    departureDate : Date;
    returnDate    : Date;
}

interface FlightBookingResult {
}

export abstract class AbstractFlightProvider extends AbstractProvider<Flight> {

    constructor(
        public  name          : string,
        public  logo          : string,
        private fee_fix       : number,
        private fee_variable  : number,
        private fee_direction : boolean
    ) {
        super(name, logo, fee_fix, fee_variable, fee_direction);
    }

    abstract find(searchParams: FlightSearchParams): Observable<Flight[]>;

    abstract book(flightPrice: FlightPrice): FlightBookingResult;

}
