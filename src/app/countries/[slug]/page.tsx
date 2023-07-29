'use client'

import { getCountryById } from '@/lib/getCountries'
import { CountryNameType } from '@/types/countriesData'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import { IndividualCountryDataType } from '@/types/countriesData'
import { useAppContext } from '@/context/appContext'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Spinner from '@/components/Spinner'

/* export async function generateStaticParams() {
  const allCountries = await getAllCountries('', '')
  return allCountries.data.map((country: CountryDataType) => ({
    slug: country.ccn3,
  }))
}
 */
export default function Page({ params }: { params: { slug: string } }) {
  const [countryInfo, setCountryInfo] = useState<{
    data: IndividualCountryDataType
  } | null>(null)

  const [bordersInfo, setBordersInfo] = useState<
    { data: { name: CountryNameType; ccn3: string } }[]
  >([])

  const [isLoadingCountry, setIsLoadingCountry] = useState(false)
  const [isLoadingBorders, setIsLoadingBorders] = useState(false)

  const { darkTheme } = useAppContext()
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      setIsLoadingCountry(true)
      const countryInfoRes = await getCountryById(params.slug, false)
      setCountryInfo(countryInfoRes)
      setIsLoadingCountry(false)
    })()
  }, [params.slug])

  useEffect(() => {
    if (countryInfo) {
      ;(async () => {
        setIsLoadingBorders(true)
        const bordersInfoRes = await Promise.all(
          countryInfo.data.borders.map((border) => getCountryById(border, true))
        )
        setBordersInfo(bordersInfoRes)
        setIsLoadingBorders(false)
      })()
    }
  }, [countryInfo])

  return (
    <main
      className={`${
        darkTheme ? 'bg-bg-very-dark-blue' : 'bg-very-light-gray'
      } w-full relative min-h-screen`}
    >
      {isLoadingCountry ? (
        <div className='w-full h-screen flex justify-center items-start pt-16 lg:items-center lg:pt-0'>
          <Spinner />
        </div>
      ) : (
        <div className='w-[85%] py-8 mx-auto flex flex-col gap-16'>
          <button
            type='button'
            onClick={() => router.back()}
            className={`flex justify-center items-center gap-2 px-4 py-2 shadow-md rounded-sm w-[110px] text-sm font-normal ${
              darkTheme
                ? 'bg-dark-blue text-very-light-gray'
                : 'bg-white text-text-very-dark-blue'
            }`}
          >
            <FontAwesomeIcon
              icon={faArrowLeftLong}
              className={'text-[1.25rem]'}
              color={`${darkTheme ? '#fff' : 'hsl(200, 15%, 8%)'}`}
            />
            <div className='leading-[normal]'>Back</div>
          </button>
          {countryInfo && (
            <div className='flex flex-col gap-10'>
              <div className='w-full relative h-[220px]'>
                <Image
                  src={countryInfo.data.flags.svg}
                  alt={
                    countryInfo.data.flags.alt || countryInfo.data.name.common
                  }
                  fill={true}
                />
              </div>
              <div
                className={`flex flex-col gap-6 ${
                  darkTheme
                    ? 'text-very-light-gray'
                    : 'text-text-very-dark-blue'
                }`}
              >
                <h1 className='text-2xl font-bold'>
                  {countryInfo.data.name.common}
                </h1>
                <div className='flex flex-col gap-10 text-sm'>
                  <div className='flex flex-col gap-3'>
                    <div className='flex gap-2'>
                      <span className='font-semibold'>Native Name: </span>
                      <span className='font-normal'>
                        {
                          Object.values(countryInfo.data.name.nativeName)[0]
                            .common
                        }
                      </span>
                    </div>
                    <div className='flex gap-2'>
                      <span className='font-semibold'>Population: </span>
                      <span className='font-normal '>
                        {countryInfo.data.population}
                      </span>
                    </div>
                    <div className='flex gap-2'>
                      <span className='font-semibold'>Region: </span>
                      <span className='font-normal '>
                        {countryInfo.data.region}
                      </span>
                    </div>
                    <div className='flex gap-2'>
                      <span className='font-semibold'>Sub Region: </span>
                      <span className='font-normal '>
                        {countryInfo.data.subregion}
                      </span>
                    </div>
                    <div className='flex gap-2'>
                      <span className='font-semibold'>Capital: </span>
                      <span className='font-normal '>
                        {countryInfo.data.capital}
                      </span>
                    </div>
                  </div>
                  <div className='flex flex-col gap-3'>
                    <div className='flex gap-2'>
                      <span className='font-semibold'>Top Level Domain: </span>
                      <span className='font-normal '>
                        {countryInfo.data.tld[0]}
                      </span>
                    </div>
                    <div className='flex gap-2'>
                      <span className='font-semibold'>Currencies: </span>
                      <span className='font-normal '>
                        {Object.values(countryInfo.data.currencies)
                          .map((currency) => currency.name)
                          .join(', ')}
                      </span>
                    </div>
                    <div className='flex gap-2'>
                      <span className='font-semibold'>Languages: </span>
                      <span className='font-normal '>
                        {Object.values(countryInfo.data.languages).join(', ')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-4'>
                  <h2>Border Countries:</h2>
                  {isLoadingBorders ? (
                    <div className='w-full h-screen flex justify-center items-center'>
                      <Spinner />
                    </div>
                  ) : (
                    <div className='flex flex-wrap gap-3'>
                      {bordersInfo &&
                        bordersInfo.map((border) => (
                          <Link
                            key={border.data.ccn3}
                            href={`/countries/${border.data.ccn3}`}
                            className={`flex justify-center items-center px-4 py-2 shadow-md rounded-md w-[90px] text-sm font-normal truncate ${
                              darkTheme
                                ? 'bg-dark-blue text-very-light-gray'
                                : 'bg-white text-text-very-dark-blue'
                            }`}
                          >
                            {border.data.name.common}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  )
}
