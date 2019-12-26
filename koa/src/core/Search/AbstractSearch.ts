import { Observable } from 'rxjs/Observable';
import { AbstractProvider }  from '../Providers/AbstractProvider';


export abstract class AbstractSearch<T> {

    constructor(
        private providerList: AbstractProvider<T>[];
    ) {}

    public getProviderList(): AbstractProvider<T>[] {
        return this.providerList;
    }

    public addProvider(provider: AbstractProvider<T>): void {
        this.providerList.push(provider);
    }

    public removeProvider(provider: AbstractProvider<T>): boolean {
        const index = this.providerList.findIndex(p => p == provider);

        if (index < 0) { // provider not found
            return false;
        } else {
            this.providerList.splice(index, 1);
            return true;
        }
    }

    abstract search(searchParams: any): Observable<T[]>;
}
