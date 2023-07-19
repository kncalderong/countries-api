import { endpoint } from '@/utils/endpoint'

export async function getAllCountries(
  search: string = '',
  region: string = ''
) {
  const data = await fetch(
    `${endpoint}/countries${
      search ? `?search=${search}` : region ? `?region=${region}` : ''
    }`
  )

  if (!data.ok) {
    throw new Error('Failed to fetch data')
  }

  return data.json()
}

export async function getCountryById(slug: string) {
  const data = await fetch(`${endpoint}/countries/${slug}`)

  if (!data.ok) {
    throw new Error('Failed to fetch data')
  }

  return data.json()
}
