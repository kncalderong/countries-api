import { useAppContext } from '@/context/appContext'
import React from 'react'

const Spinner = () => {
  const { darkTheme } = useAppContext()
  return (
    <div className='w-full flex justify-center'>
      <div
        className={`relative w-6 h-3 ${
          darkTheme ? 'bg-very-light-gray' : 'bg-bg-very-dark-blue'
        } animate-middleLoaderAnimation`}
      >
        <div
          className={`absolute top-1/2 w-full h-full left-0 -translate-x-full border-r-[1px] border-r-transparent animate-leftLoaderAnimation ${
            darkTheme ? 'bg-very-light-gray' : 'bg-bg-very-dark-blue'
          }`}
        ></div>
        <div
          className={`absolute top-1/2 w-full h-full right-0 translate-x-full border-l-[1px] border-l-transparent animate-rightLoaderAnimation ${
            darkTheme ? 'bg-very-light-gray' : 'bg-bg-very-dark-blue'
          }`}
        ></div>
      </div>
    </div>
  )
}

export default Spinner
