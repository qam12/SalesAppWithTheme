export interface LocationObject {
    lat: string,
    lng: string
}

export interface DirectionObject {
    origin: LocationObject,
    destination: LocationObject
}
