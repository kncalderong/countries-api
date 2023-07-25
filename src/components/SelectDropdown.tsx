import { useAppContext } from '@/context/appContext'
import capitalize from '@/utils/capitalize'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

type SelectDropdownPropsType = {
  setTargetValue: React.Dispatch<React.SetStateAction<string>>
  targetValue: string
  options: string[]
}

const SelectDropdown = ({
  setTargetValue,
  targetValue,
  options,
}: SelectDropdownPropsType) => {
  const { darkTheme } = useAppContext()
  const [isSelectOpen, setIsSelectOpen] = useState(false)

  const toggleSelect = () => {
    setIsSelectOpen(!isSelectOpen)
  }

  return (
    <div className={`w-[60%] relative`}>
      <div
        className={`py-4 px-6 ${
          darkTheme
            ? 'bg-dark-blue text-white'
            : 'bg-white text-text-very-dark-blue'
        } cursor-pointer flex justify-between items-center rounded-md shadow-md`}
        onClick={toggleSelect}
      >
        <div>{targetValue ? capitalize(targetValue) : 'Filter by Region'}</div>
        <FontAwesomeIcon
          icon={isSelectOpen ? faChevronUp : faChevronDown}
          color={`${darkTheme ? '#fff' : 'hsl(200, 15%, 8%)'}`}
          width={'16px'}
        />
      </div>
      {isSelectOpen && (
        <div
          className={`${
            darkTheme
              ? 'bg-dark-blue text-white'
              : 'bg-white text-text-very-dark-blue'
          } absolute px-6 py-4 flex flex-col gap-4 items-start w-full rounded-md left-0 top-[4rem] shadow-md z-40`}
        >
          {options.map((option, idx) => (
            <div
              key={idx}
              onClick={() => {
                setTargetValue(option)
                toggleSelect()
              }}
              className='cursor-pointer'
            >
              {capitalize(option)}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SelectDropdown
