'use client'

import { useState, useEffect } from 'react'

export interface Position {
  latitude: number
  longitude: number
}

export function useCurrentPosition() {
  const [position, setPosition] = useState<Position | null>(null)
  const [consent, setConsent] = useState<'granted' | 'denied' | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('geoConsent') as 'granted' | 'denied' | null
    if (stored) {
      setConsent(stored)
    }
  }, [])

  useEffect(() => {
    if (consent === 'granted' && !position) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        })
      })
    }
  }, [consent, position])

  const Banner = !consent ? (
    <div className="fixed bottom-0 inset-x-0 bg-gray-800 text-white p-4 flex justify-between items-center">
      <span>Nous utilisons votre position pour afficher les prospects autour de vous.</span>
      <button
        className="ml-4 px-3 py-1 bg-blue-600 rounded"
        onClick={() => {
          localStorage.setItem('geoConsent', 'granted')
          setConsent('granted')
        }}
      >
        J'accepte
      </button>
    </div>
  ) : null

  return { position, ConsentBanner: Banner }
}
