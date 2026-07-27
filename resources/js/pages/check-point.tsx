"use client"

import { useEffect, useState, useRef } from "react"
import { Head } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Camera } from "lucide-react"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const workunits = [
  { label: "Unit Name", value: null },
  { label: "KC LARANTUKA", value: "0246" },
  { label: "KCP LEWOLEBA", value: "0685" },
  { label: "UNIT LEWOLEBA", value: "3491" },
  { label: "UNIT LARANTUKA KOTA", value: "3492" },
  { label: "UNIT WAIWERANG", value: "3493" },
  { label: "UNIT BALAURING", value: "4678" },
  { label: "UNIT BORU", value: "4679" },
  { label: "UNIT GELEKAT LEWO", value: "4680" },
  { label: "UNIT WAIWADAN", value: "4681" },
  { label: "UNIT WUNOPITO", value: "4682" },
  { label: "UNIT CENDANA SOLOR", value: "7227" },
  { label: "UNIT HINGA", value: "7496" },
]

export default function Checkpoint() {
    const [location, setLocation] = useState(null)
    const [preview, setPreview] = useState(null)
    const fileRef = useRef(null)

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
            <Head title="Check point" />
            <div className="min-h-screen">
                <header className="sticky top-0 z-50 w-full bg-primary">
                    <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-3">
                        <img
                            src="/img/danantara.png"
                            alt="Danantara Indonesia"
                            className="h-6 sm:h-8 object-contain"
                        />
                        <span
                            className="hidden sm:block text-[11px] tracking-[0.25em] uppercase text-background"
                        >
                            Brilian Culture Fest
                        </span>
                        <img
                            src="/img/bri.png"
                            alt="BRI"
                            className="h-4 sm:h-6 object-contain"
                        />
                    </div>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="w-full max-w-5xl mx-auto grid gap-6 px-6 pt-14 pb-10 text-center">
                        <form>
                            <FieldGroup>
                                <FieldSet>
                                    <FieldLegend>Worker Data</FieldLegend>
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel htmlFor="personalnumber">
                                                Personal Number
                                            </FieldLabel>
                                            <Input
                                                id="personalnumber"
                                                placeholder="00000000"
                                                required
                                            />
                                            <FieldDescription>
                                                Enter your 08-digit personal number
                                            </FieldDescription>
                                        </Field>
                                        <Field>
                                            <FieldLabel htmlFor="full">
                                                Full Name
                                            </FieldLabel>
                                            <Input
                                                id="fullname"
                                                placeholder="PT. Bank Rakyat Indonesia (Persero) Tbk."
                                                required
                                            />
                                        </Field>
                                        <Field>
                                            <FieldLabel htmlFor="workunit">
                                                Work Unit
                                            </FieldLabel>
                                            <Select items={workunits}>
                                            <SelectTrigger id="workunit">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                {workunits.map((item) => (
                                                    <SelectItem key={item.value} value={item.value}>
                                                    {item.label}
                                                    </SelectItem>
                                                ))}
                                                </SelectGroup>
                                            </SelectContent>
                                            </Select>
                                        </Field>
                                    </FieldGroup>
                                </FieldSet>
                                <FieldSet>
                                    <FieldLegend>Check Point</FieldLegend>
                                    <FieldGroup>
                                        <Field>
                                            <FieldLabel htmlFor="currentlocations">
                                                Current Locations
                                            </FieldLabel>
                                            <Input
                                                id="currentlocations"
                                                value={location ? `${location.lat}, ${location.lng}` : "Loading lokasi..."} disabled
                                                className="hidden"
                                            />
                                        </Field>
                                        <Field>
                                            <FieldLabel htmlFor="currentlocations">
                                                Kamera
                                            </FieldLabel>
                                            <input
                                              ref={fileRef}
                                              type="file"
                                              accept="image/*"
                                              capture="environment"
                                              className="hidden"
                                              onChange={(e) => {
                                                const file = e.target.files[0]
                                                if (file) {
                                                  setPreview(URL.createObjectURL(file))
                                                }
                                              }}
                                            />

                                            {preview && (
                                              <img src={preview} className="mt-3 rounded-lg" />
                                            )}
                                            <Button
                                              type="button"
                                              className="w-full flex items-center gap-2"
                                              onClick={() => fileRef.current.click()}
                                            >
                                              <Camera className="w-5 h-5" />
                                              Take Picture
                                            </Button>
                                        </Field>
                                    </FieldGroup>
                                </FieldSet>
                                <Field orientation="horizontal">
                                    <Button type="submit">Submit</Button>
                                </Field>
                            </FieldGroup>
                        </form>
                    </main>
                </div>
            </div>
        </>
    );
}
