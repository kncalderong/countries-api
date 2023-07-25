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
      } flex justify-between items-center shadow-lg`}
    >
      <Link
        href={'/'}
        className={`font-extrabold ${
          darkTheme ? 'text-white' : 'text-text-very-dark-blue'
        } cursor-pointer`}
      >
        Where in the world?
      </Link>
      <div
        className='flex gap-2 justify-between items-center cursor-pointer'
        onClick={() => toggleTheme()}
      >
        <FontAwesomeIcon
          icon={faMoon}
          width={'16px'}
          color={`${darkTheme ? '#fff' : 'hsl(200, 15%, 8%)'}`}
        />
        <p
          className={`text-sm ${
            darkTheme ? 'text-white' : 'text-text-very-dark-blue'
          }`}
        >
          Dark Mode
        </p>
      </div>
    </header>
  )
}

export default Header
