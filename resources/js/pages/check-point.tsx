"use client"

import { useEffect, useState } from "react"
import { Head } from "@inertiajs/react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Checkin() {
  const [location, setLocation] = useState(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      })
    })
  }, [])

  return (
    <>
      <Head title="Check-in" />

      <div className="max-w-md mx-auto p-6 space-y-4">

        <Input placeholder="PN" />
        <Input placeholder="Nama Lengkap" />
        <Input placeholder="Unit Kerja" />

        {/* lokasi otomatis */}
        <Input
          value={location ? `${location.lat}, ${location.lng}` : "Loading lokasi..."}
          disabled
        />

        {/* kamera */}
        <input
          type="file"
          accept="image/*"
          capture="environment"
          className="w-full"
        />

        <Button className="w-full">
          Submit
        </Button>

      </div>
    </>
  )
}
