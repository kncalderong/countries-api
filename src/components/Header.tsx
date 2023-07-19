'use client'

import { useAppContext } from '@/context/appContext'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  const { darkTheme, toggleTheme } = useAppContext()

  console.log('darkTheme', darkTheme)

  return (
    <header className='w-full fixed top-0 px-4 py-8 bg-white flex justify-between items-center'>
      <Link href={'/'} className='font-extrabold'>
        Where in the world?
      </Link>
      <div
        className='flex gap-2 justify-between items-center'
        onClick={() => toggleTheme()}
      >
        <FontAwesomeIcon icon={faMoon} width={'16px'} />
        <p className='text-sm'>Dark Mode</p>
      </div>
    </header>
  )
}

export default Header
