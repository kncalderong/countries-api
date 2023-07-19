import { NextApiRequest } from 'next'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  let region = req.nextUrl.searchParams.get('region')
  let search = req.nextUrl.searchParams.get('search')
  let query = `https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,ccn3`
  if (search) {
    search = search.toLowerCase().replaceAll(' ', '%20')
    query = `https://restcountries.com/v3.1/name/${search}?fields=name,capital,region,population,flags,ccn3`
  }
  if (region && !search) {
    query = `https://restcountries.com/v3.1/region/${region}?fields=name,capital,region,population,flags,ccn3`
  }

  try {
    const res = await fetch(query)
    const data = await res.json()
    return NextResponse.json({ data })
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
