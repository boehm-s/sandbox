import { Observable } from 'rxjs/Observable';


interface FlightSearchParams {
    origin: string;
    destination: string;
    departureDate: Date;
    returnDate: Date;
}

interface Flight {

}

abstract class AbstractFlightProvider {
    name          : string;
    logo          : string;
    fee_fix       : number;
    fee_variable  : number;
    fee_direction : boolean;

    constructor(name: string, logo: string, fee_fix: number, fee_variable: number, fee_direction: boolean) {
        this.name          = name;
        this.logo          = logo;
        this.fee_fix       = fee_fix;
        this.fee_variable  = fee_variable;
        this.fee_direction = fee_direction;
    }

    abstract findFlights(searchParams: FlightSearchParams): Observable<Flight[]>;
}
