'use client'

import { AllCountriesDataType, CountryDataType } from '@/types/countriesData'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppContext } from '@/context/appContext'
import { useEffect, useMemo, useState } from 'react'
import { getAllCountries } from '@/lib/getCountries'
import regionOptions from '@/utils/regionOptions'
import SelectDropdown from '@/components/SelectDropdown'

export default function Home() {
  const { darkTheme } = useAppContext()
  const [data, setData] = useState<AllCountriesDataType>({ data: [] })
  const [selectedRegion, setSelectedRegion] = useState('')
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const [toSearch, setToSearch] = useState('')

  useEffect(() => {
    ;(async () => {
      const retrievedData = await getAllCountries('', selectedRegion)
      setData(retrievedData)
    })()
  }, [selectedRegion])

  const debounce = () => {
    let timeoutID: ReturnType<typeof setTimeout>
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setToSearch(e.target.value)
      clearTimeout(timeoutID)
      timeoutID = setTimeout(async () => {
        const retrievedData = await getAllCountries(e.target.value, '')
        setData(retrievedData)
      }, 300)
    }
  }
  const optimizedDebounce = useMemo(() => debounce(), [])

  return (
    <main
      className={`${
        darkTheme ? 'bg-bg-very-dark-blue' : 'bg-very-light-gray'
      } w-full relative`}
    >
      <div className='w-[90%] mx-auto pt-6'>
        <div className='flex flex-col gap-8 items-start w-full'>
          <div
            className={`flex px-6 py-2 gap-4 justify-start items-center rounded-md w-full ${
              darkTheme ? 'bg-dark-blue' : 'bg-white'
            }`}
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              width={'16px'}
              color={`${darkTheme ? '#fff' : 'hsl(200, 15%, 8%)'}`}
            />
            <input
              type='text'
              placeholder='Search for a country...'
              className={`${
                darkTheme
                  ? 'bg-dark-blue text-white placeholder:text-white'
                  : 'bg-white text-text-very-dark-blue placeholder:text-text-very-dark-blue'
              }  px-4 py-2 `}
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
        <div className='w-[80%] mx-auto pt-6'>
          {data.data.map((country: CountryDataType) => {
            return <div key={country.ccn3}>{country.name.common}</div>
          })}
        </div>
      </div>
    </main>
  )
}
