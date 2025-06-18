import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">GeoProspect</h1>
      <Link className="text-blue-500" href="/login">Se connecter</Link>
    </main>
  )
}
