'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import { supabase } from '@/lib/supabase'
import { useCurrentPosition } from '@/app/hooks/useCurrentPosition'
import ProspectModal, { Prospect } from '@/app/components/ProspectModal'

const RADIUS_KM = 5

export default function MapPage() {
  const { position, ConsentBanner } = useCurrentPosition()
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [prospects, setProspects] = useState<Prospect[]>([])
  const [selected, setSelected] = useState<Prospect | null>(null)

  useEffect(() => {
    if (position && mapRef.current && !map) {
      const mapObj = new google.maps.Map(mapRef.current, {
        center: { lat: position.latitude, lng: position.longitude },
        zoom: 14,
      })
      setMap(mapObj)
    }
  }, [position, map])

  useEffect(() => {
    if (!map || !position) return
    async function loadProspects() {
      const { data } = await supabase.rpc('prospects_within_radius', {
        lat: position.latitude,
        lng: position.longitude,
        radius_km: RADIUS_KM,
      })
      if (data) {
        setProspects(data)
      }
    }
    loadProspects()
  }, [map, position])

  useEffect(() => {
    if (!map) return
    prospects.forEach((prospect) => {
      const marker = new google.maps.Marker({
        position: { lat: prospect.latitude, lng: prospect.longitude },
        map,
      })
      marker.addListener('click', () => setSelected(prospect))
    })
  }, [map, prospects])

  return (
    <main className="h-screen w-full">
      <Script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`}></Script>
      <div ref={mapRef} className="h-full" />
      {ConsentBanner}
      {selected && <ProspectModal prospect={selected} onClose={() => setSelected(null)} />}
    </main>
  )
}
