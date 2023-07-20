'use client'

import { AllCountriesDataType, CountryDataType } from '@/types/countriesData'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppContext } from '@/context/appContext'
import { useEffect, useState } from 'react'
import { getAllCountries } from '@/lib/getCountries'

export default function Home() {
  const { darkTheme } = useAppContext()
  const [data, setData] = useState<AllCountriesDataType>({ data: [] })
  const [selectedRegion, setSelectedRegion] = useState('')
  const [toSearch, setToSearch] = useState('')

  useEffect(() => {
    ;(async () => {
      const retrievedData = await getAllCountries(toSearch, selectedRegion)
      setData(retrievedData)
    })()
  }, [selectedRegion])

  console.log('selectedRegion: ', selectedRegion)

  return (
    <main
      className={`${
        darkTheme ? 'bg-bg-very-dark-blue' : 'bg-very-light-gray '
      }`}
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
        <select
          name='region'
          id='region-select'
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option value=''>Filter by Region</option>
          <option value='africa'>Africa</option>
          <option value='america'>America</option>
          <option value='asia'>Asia</option>
          <option value='europe'>Europe</option>
          <option value='oceania'>Oceania</option>
        </select>
      </div>
      <div>
        {data.data.map((country: CountryDataType) => {
          return <div key={country.ccn3}>{country.name.common}</div>
        })}
      </div>
    </main>
  )
}
