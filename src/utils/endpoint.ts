export const endpoint =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3000/api'
    : 'https://kn-countries-api-jade-eight.vercel.app/api'
