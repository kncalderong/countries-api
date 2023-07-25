'use client'

import { AllCountriesDataType, CountryDataType } from '@/types/countriesData'
import {
  faChevronDown,
  faChevronUp,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppContext } from '@/context/appContext'
import { useEffect, useState } from 'react'
import { getAllCountries } from '@/lib/getCountries'
import regionOptions from '@/utils/regionOptions'
import capitalize from '@/utils/capitalize'
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

  console.log('selectedRegion: ', selectedRegion)
  const toggleSelect = () => {
    setIsSelectOpen(!isSelectOpen)
  }

  return (
    <main
      className={`${darkTheme ? 'bg-bg-very-dark-blue' : 'bg-very-light-gray'}`}
    >
      <div className='flex flex-col gap-8 items-start'>
        <div
          className={`flex px-6 py-3 gap-5 justify-between items-center ${
            darkTheme ? 'bg-dark-blue' : 'bg-white'
          }`}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            width={'16px'}
            color={`${darkTheme ? '#fff' : 'hsl(200, 15%, 8%)'}`}
          />
          <input type='text' placeholder='Search for a country...' />
        </div>
        <SelectDropdown
          options={regionOptions}
          targetValue={selectedRegion}
          setTargetValue={setSelectedRegion}
        />
      </div>
      <div>
        {data.data.map((country: CountryDataType) => {
          return <div key={country.ccn3}>{country.name.common}</div>
        })}
      </div>
    </main>
  )
}
