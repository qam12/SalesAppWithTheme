
export interface UserLocation {
    TranDate: string;
    UserName: string;
    MSISDN: string;
    Locations: LocationList[];
}

export interface LocationList {
    Date: string;
    Time:string;
    Longitude:string;
    Latitude:string;
    TimeAtLocation:string;
    GoogleMapLink:string;
}