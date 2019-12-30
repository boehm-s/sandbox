import { AbstractFlightProvider } from './AbstractFlightProvider';

export class MisterflyProvider extends AbstractFlightProvider {

    constructor(
        public  name          : string,
        public  logo          : string,
        private fee_fix       : number,
        private fee_variable  : number,
        private fee_direction : boolean
    ) {
        this.name = 'misterfly';
        this.logo = 'images/providers_logo/default-logo.png';
        this.fee_fix = 0;
        this.fee_variable = 1;
        this.fee_direction = 1;
    }

    const SOAPENVELOPE            = 'http://webservice.eva.koedia.com';
    const SOAPENDPOINT            = 'http://webservice.eva.koedia.com/v1.3.1/flightservice';
    const SOAPSCHEMAS             = 'http://webservice.eva.koedia.com/document/v0.1/schemas';
    const MAX_RETRY_SEARCH_FLIGHT = 3;

    const MISTERFLY_CODE          = process.env.MISTERFLY_CODE; // EKO_KTQV842_testFlexy
    const MISTERFLY_PASSWORD      = process.env.MISTERFLY_PASSWORD; // YOAL883_FLYeko7_testFlexy


    private buildSearchParams(searchParams: AbstractFlightSearchParams): any {
        const parameters = `
            <sch:ReqFlightAvailability currency="EUR" lang="fre">
                <sch:ClientIdentification
                    networkcode="MISTERFLY"
                    canalcode="CANAL_EKOTRIP"
                    agencycode="${MISTERFLY_CODE}"
                    password="${MISTERFLY_PASSWORD}"
                    customeragentid="EkoTrip"
                />
                <sch:TripInformations>
                    <sch:Adult number="1"/>
                    <sch:Child/>
                    <sch:Infant/>
                    <sch:PointToPoint>
                        <sch:StartPoint type="airport" code="PAR"/>
                        <sch:StartDate>2019-12-04</sch:StartDate>
                        <sch:EndPoint type="airport" code="MOW"/>
                        <sch:MaxStops>0</sch:MaxStops>
                    </sch:PointToPoint>
                    <sch:PointToPoint>
                        <sch:StartPoint type="airport" code="MOW"/>
                        <sch:StartDate>2019-12-11</sch:StartDate>
                        <sch:EndPoint type="airport" code="PAR"/>
                        <sch:MaxStops>0</sch:MaxStops>
                    </sch:PointToPoint>
                    <sch:ClassOfService>economic</sch:ClassOfService>
                </sch:TripInformations>
            </sch:ReqFlightAvailability>`;


    }

    find(searchParams: any) {
        const parameters = this.buildSearchParams(searchParams);

    }
}
