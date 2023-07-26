import { getAllCountries, getCountryById } from '@/lib/getCountries'
import { CountryDataType } from '@/types/countriesData'

export async function generateStaticParams() {
  const allCountries = await getAllCountries('', '')
  return allCountries.data.map((country: CountryDataType) => ({
    slug: country.ccn3,
  }))
}

export default async function Page({ params }: { params: { slug: string } }) {
  const countryInfo = await getCountryById(params.slug)
  console.log('countryInfo: ', countryInfo)
}
