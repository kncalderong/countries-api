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
  name: CountryNameType
  population: number
  region: string
}

export interface IndividualCountryDataType extends CountryDataType {
  tld: string[]
  currencies: CurrenciesObjType
  subregion: string
  languages: {
    [k: string]: string
  }
  borders: string[]
}

export interface CurrenciesObjType {
  [k: string]: {
    name: string
    symbol: string
  }
}

export interface CountryNameType {
  common: string
  nativeName:
    | string
    | {
        [k: string]: {
          common: string
          official: string
        }
      }
  official?: string
}
