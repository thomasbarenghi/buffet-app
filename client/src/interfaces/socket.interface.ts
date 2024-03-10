export interface SockDealerData {
  coordinates: Coordinates
  active: boolean
  taken: boolean
}

export interface FormatedSockDealer {
  sockId: string
  clientId: string
  coordinates: Coordinates
  active: boolean
  taken: boolean
}

export interface Coordinates {
  lat: string
  lon: string
}
