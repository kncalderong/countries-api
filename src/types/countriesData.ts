export interface AllCountriesDataType {
  data: CountryDataType[]
}

export interface CountryDataType {
  capital: string[]
  ccn3: string
  flags: {
    alt?: string
    png: string
    svg: string
  }
  name: {
    common: string
    nativeName:
      | string
      | {
          [k: string]: {
            common: string
            official?: string
          }
        }
  }
  population: number
  region: string
}
