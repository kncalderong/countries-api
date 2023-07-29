'use client'

import { useAppContext } from '@/context/appContext'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  const { darkTheme, toggleTheme } = useAppContext()

  return (
    <header
      className={`w-full relative px-4 py-8 ${
        darkTheme ? 'bg-dark-blue' : 'bg-white'
      } flex justify-between items-center shadow-md text-sm z-20 md:px-0  `}
    >
      <div className='flex justify-between items-center w-full md:w-[90%] md:mx-auto 2xl:w-[80%]'>
        <Link
          href={'/'}
          className={`font-extrabold ${
            darkTheme ? 'text-white' : 'text-text-very-dark-blue'
          } cursor-pointer lg:text-2xl`}
        >
          Where in the world?
        </Link>
        <div
          className='flex gap-2 justify-between items-center cursor-pointer lg:text-base'
          onClick={() => toggleTheme()}
        >
          <FontAwesomeIcon
            icon={faMoon}
            width={'16px'}
            color={`${darkTheme ? '#fff' : 'hsl(200, 15%, 8%)'}`}
            className=''
          />
          <p
            className={`text-sm ${
              darkTheme ? 'text-white' : 'text-text-very-dark-blue'
            } lg:text-base`}
          >
            Dark Mode
          </p>
        </div>
      </div>
    </header>
  )
}

export default Header
