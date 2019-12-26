import { Observable } from 'rxjs/Observable';

export abstract class AbstrBactProvider<T> {

    constructor(
        public  name          : string,
        public  logo          : string,
        private fee_fix       : number,
        private fee_variable  : number,
        private fee_direction : boolean
    ) {}

    abstract find(searchParams: any): Observable<T[]>;

    abstract book(priceItem: any): any;
}
