"use client"

import { Head, router } from '@inertiajs/react'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Welcome() {

  const [loadingId, setLoadingId] = useState(null)

  const checkpoints = [
    {
      id: 1,
      name: "Check Point 1",
      description: "BRI Kantor Cabang Larantuka",
      lat: -8.342104,
      lng: 122.986972,
    },
    {
      id: 2,
      name: "Check Point 2",
      description: "Panggung utama",
      lat: -8.315326,
      lng: 123.017696,
    },
  ]

  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3
    const φ1 = lat1 * Math.PI / 180
    const φ2 = lat2 * Math.PI / 180
    const Δφ = (lat2 - lat1) * Math.PI / 180
    const Δλ = (lon2 - lon1) * Math.PI / 180

    const a =
      Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) ** 2

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const handleCheck = (cp) => {
    if (!navigator.geolocation) {
      alert("Browser tidak support GPS")
      return
    }

    setLoadingId(cp.id)

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLat = pos.coords.latitude
        const userLng = pos.coords.longitude

        const distance = getDistance(userLat, userLng, cp.lat, cp.lng)

        if (distance <= 50) {
          router.get('/checkpoint', {
            lat: cp.lat,
            lng: cp.lng,
            name: cp.name,
          })
        } else {
          alert(`Anda di luar area (${Math.round(distance)} meter)`)
        }

        setLoadingId(null)
      },
      (err) => {
        setLoadingId(null)
        alert("Gagal ambil lokasi. Izinkan GPS ya.")
      }
    )
  }

  return (
    <>
      <Head title="Welcome" />

      <div className="flex min-h-screen flex-col bg-background p-6 text-primary lg:justify-center lg:p-8">
        <div className="w-full max-w-5xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {checkpoints.map((cp) => (
            <Card key={cp.id} className="overflow-hidden pt-0">

              <iframe
                src={`https://maps.google.com/maps?q=${cp.lat},${cp.lng}&z=15&output=embed`}
                className="w-full aspect-video border-0"
              />

              <CardHeader>
                <CardTitle className="text-center">{cp.name}</CardTitle>
                <CardDescription className="text-center">
                  {cp.description}
                </CardDescription>
              </CardHeader>

              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => handleCheck(cp)}
                  disabled={loadingId === cp.id}
                >
                  {loadingId === cp.id ? "Checking..." : "View Event"}
                </Button>
              </CardFooter>

            </Card>
          ))}

        </div>
      </div>
    </>
  )
}
