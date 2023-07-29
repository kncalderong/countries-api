'use client'

import { AllCountriesDataType, CountryDataType } from '@/types/countriesData'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppContext } from '@/context/appContext'
import { useEffect, useMemo, useState } from 'react'
import { getAllCountries } from '@/lib/getCountries'
import regionOptions from '@/utils/regionOptions'
import SelectDropdown from '@/components/SelectDropdown'
import Image from 'next/image'
import Link from 'next/link'
import Spinner from '@/components/Spinner'

export default function Home() {
  const { darkTheme } = useAppContext()
  const [data, setData] = useState<AllCountriesDataType>({ data: [] })
  const [selectedRegion, setSelectedRegion] = useState('')
  const [toSearch, setToSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const retrievedData = await getAllCountries('', selectedRegion)
      setData(retrievedData)
      setIsLoading(false)
    })()
  }, [selectedRegion])

  const debounce = () => {
    let timeoutID: ReturnType<typeof setTimeout>
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setToSearch(e.target.value)
      setIsLoading(true)
      clearTimeout(timeoutID)
      timeoutID = setTimeout(async () => {
        const retrievedData = await getAllCountries(e.target.value, '')
        setData(retrievedData)
        setIsLoading(false)
      }, 300)
    }
  }
  const optimizedDebounce = useMemo(() => debounce(), [])

  return (
    <main
      className={`${
        darkTheme ? 'bg-bg-very-dark-blue' : 'bg-very-light-gray'
      } w-full relative min-h-screen`}
    >
      <div className='w-[90%] mx-auto py-6 2xl:w-[80%] lg:py-14'>
        <div className='flex flex-col gap-8 items-start w-full lg:flex-row lg:justify-between'>
          <div
            className={`flex px-6 py-2 gap-4 justify-start items-center rounded-md w-full shadow-md ${
              darkTheme ? 'bg-dark-blue' : 'bg-white'
            } lg:max-w-[580px]`}
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              width={'16px'}
              color={`${darkTheme ? '#fff' : 'hsl(0, 0%, 52%)'}`}
            />
            <input
              type='text'
              placeholder='Search for a country...'
              className={`${
                darkTheme
                  ? 'bg-dark-blue text-white placeholder:text-[hsl(0,0%,98%)] '
                  : 'bg-white text-text-very-dark-blue placeholder:text-[hsl(0,0%,52%)] '
              }  px-4 py-2 text-sm lg:grow lg:py-3`}
              value={toSearch}
              onChange={optimizedDebounce}
            />
          </div>
          <SelectDropdown
            options={regionOptions}
            targetValue={selectedRegion}
            setTargetValue={setSelectedRegion}
          />
        </div>
        <div className='w-[80%] mx-auto pt-6 flex flex-col gap-10 md:flex-row md:flex-wrap lg:w-full lg:py-14 lg:gap-16 2xl:gap-24'>
          {isLoading ? (
            <div className='w-full h-screen flex justify-center items-start pt-16 lg:items-center lg:pt-0'>
              <Spinner />
            </div>
          ) : data.data?.length > 0 ? (
            data.data.map((country: CountryDataType, idx) => {
              return (
                <Link
                  href={`/countries/${country.ccn3}`}
                  key={country.ccn3}
                  className={`rounded-md shadow-lg ${
                    darkTheme ? 'bg-dark-blue' : 'bg-white'
                  } overflow-hidden md:w-[calc((100%-2.5rem)/2)] lg:w-[calc((100%-12rem)/4)] 2xl:w-[calc((100%-18rem)/4)]`}
                >
                  <div className='w-full relative h-[180px] lg:h-[200px]'>
                    <Image
                      src={country.flags.svg}
                      alt={country.flags.alt || country.name.common}
                      fill={true}
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                      priority={idx === 0}
                    />
                  </div>
                  <div
                    className={`${
                      darkTheme
                        ? 'text-very-light-gray'
                        : 'text-text-very-dark-blue'
                    } flex flex-col p-6 h-[180px] lg:h-[200px] lg:pt-8`}
                  >
                    <h3 className='mb-3 font-bold lg:text-lg lg:mb-5'>
                      {country.name.common}
                    </h3>
                    <div className='flex flex-col gap-2 text-xs lg:text-sm'>
                      <div className='flex gap-2'>
                        <span className='font-semibold lg:font-bold'>
                          Population:{' '}
                        </span>
                        <span>
                          {new Intl.NumberFormat('en-US').format(
                            country.population
                          )}
                        </span>
                      </div>
                      <div className='flex gap-2'>
                        <span className='font-semibold lg:font-bold'>
                          Region:{' '}
                        </span>
                        <span>{country.region}</span>
                      </div>
                      <div className='flex gap-2'>
                        <span className='font-semibold lg:font-bold'>
                          Capital:{' '}
                        </span>
                        <span>{country.capital}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })
          ) : (
            <div
              className={`${
                darkTheme ? 'text-white' : 'text-text-very-dark-blue'
              } text-lg`}
            >
              Not result found for that country
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
