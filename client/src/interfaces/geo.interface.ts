export interface Root {
  results: Result[]
  query: Query
}

export interface Result {
  datasource: Datasource
  country: string
  country_code: string
  state: string
  state_district?: string
  county: string
  city: string
  municipality?: string
  postcode: string
  suburb?: string
  street: string
  housenumber: string
  lon: number
  lat: number
  state_code: string
  formatted: string
  address_line1: string
  address_line2: string
  timezone: Timezone
  plus_code: string
  result_type: string
  rank: Rank
  place_id: string
  bbox: Bbox
  district?: string
  plus_code_short?: string
}

export interface Datasource {
  sourcename: string
  attribution: string
  license: string
  url: string
}

export interface Timezone {
  name: string
  offset_STD: string
  offset_STD_seconds: number
  offset_DST: string
  offset_DST_seconds: number
}

export interface Rank {
  importance: number
  confidence: number
  match_type: string
}

export interface Bbox {
  lon1: number
  lat1: number
  lon2: number
  lat2: number
}

export interface Query {
  text: string
  parsed: Parsed
}

export interface Parsed {
  housenumber: string
  street: string
  expected_type: string
}
