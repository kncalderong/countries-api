import { NextResponse } from 'next/server'

type ParamsType = {
  slug: string
}

export async function GET(
  request: Request,
  { params }: { params: ParamsType }
) {
  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/alpha/${params.slug}?fields=name,capital,region,subregion,population,flags,borders,tld,currencies,languages`
    )
    const data = await res.json()
    return NextResponse.json({ data })
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
