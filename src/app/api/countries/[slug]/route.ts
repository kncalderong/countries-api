import {
  IndividualCountryDataType,
  CurrenciesObjType,
} from './../../../../types/countriesData'
import { NextResponse, NextRequest } from 'next/server'
import rawData from '@/data/data.json'

type ParamsType = {
  slug: string
}

export async function GET(
  req: NextRequest,
  { params }: { params: ParamsType }
) {
  let data = []
  let getOnlyName = req.nextUrl.searchParams.get('getOnlyName') || null
  let query = `https://restcountries.com/v3.1/alpha/${params.slug}?fields=name,capital,region,subregion,population,flags,borders,tld,currencies,languages`
  if (getOnlyName) {
    query = `https://restcountries.com/v3.1/alpha/${params.slug}?fields=name,ccn3`
  }
  try {
    const res = await fetch(query)
    data = await res.json()
  } catch (error) {
    const dataToRetrieve: IndividualCountryDataType[] = rawData.map((item) => {
      let currenciesObj: CurrenciesObjType = {}
      item.currencies?.forEach((currency) => {
        currenciesObj[currency.code] = {
          name: currency.name,
          symbol: currency.symbol,
        }
      })

      let languagesObj: { [k: string]: string } = {}
      item.languages.forEach((language) => {
        languagesObj[language.iso639_2 || language.iso639_1 || language.name] =
          language.name
      })

      let country: IndividualCountryDataType = {
        capital: [item.capital!],
        ccn3: item.alpha3Code,
        flags: {
          svg: item.flags.svg,
          png: item.flags.png,
        },
        name: {
          common: item.name,
          nativeName: item.nativeName,
        },
        population: item.population,
        region: item.region,
        tld: item.topLevelDomain,
        currencies: currenciesObj,
        subregion: item.subregion,
        languages: languagesObj,
        borders: item.borders || [],
      }
      return country
    })
    data = dataToRetrieve
    if (getOnlyName) {
      data = dataToRetrieve.map((item) => {
        // To only retrieve Name and ccn3 according to specific request to external API
        return { name: item.name, ccn3: item.ccn3 }
      })
    }
  }
  return NextResponse.json({ data })
}
