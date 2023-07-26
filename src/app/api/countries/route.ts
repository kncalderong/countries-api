import { CountryDataType } from '@/types/countriesData'
import { NextResponse, NextRequest } from 'next/server'
import rawData from '@/data/data.json'

export async function GET(req: NextRequest) {
  let data = []
  let region = req.nextUrl.searchParams.get('region')
  let search = req.nextUrl.searchParams.get('search') || ''
  let query = `https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,ccn3`
  if (search) {
    search = search.toLowerCase().replaceAll(' ', '%20')
    query = `https://restcountries.com/v3.1/name/${search}?fields=name,capital,region,population,flags,ccn3`
  }
  if (region && !search) {
    query = `https://restcountries.com/v3.1/region/${region}?fields=name,capital,region,population,flags,ccn3`
  }

  try {
    const res = await fetch(query)
    data = await res.json()
  } catch (error) {
    let dataToRetrieve: CountryDataType[] = rawData.map((item) => {
      let country: CountryDataType = {
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
      }
      return country
    })
    if (region) {
      dataToRetrieve = dataToRetrieve.filter(
        (country) => country.region.toLowerCase() === region
      )
    }
    if (search.length > 0) {
      dataToRetrieve = dataToRetrieve.filter((country) =>
        country.name.common.toLowerCase().includes(search)
      )
    }
    data = dataToRetrieve
  }
  return NextResponse.json({ data })
}
