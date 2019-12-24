import { Observable, merge, takeUntil } from 'rxjs/Observable';
import { AbstractSearch} from './AbstractSearch';

const TIMEOUT = 30000; // 30s

export class FlightSearch extends AbstractSearch<Flight> {
    constructor(
        private providerList: AbstractProvider<Flight>[];
    ) {
        super(providerList);
    }

    public search(searchParams: any): Observable<Flight[]> {
        const providers = this.providerList.map(provider => {
            return provider.pipe(takeUntil(TIMEOUT);)
        });

        return merge(...providers);
    }
}
