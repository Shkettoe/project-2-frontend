import { useEffect, useState } from 'react'

const landmarks = {
  EIFFEL: { lat: 48.85839831425365, lng: 2.2944705697214878, zoom: 17 }, //17
  BIG_BEN: { lat: 51.50088940422354, lng: -0.12462541148287115, zoom: 19 }, //19
  VELENJSKO_JEZERO: { lat: 46.37560735402924, lng: 15.088515652250324, zoom: 14 }, //14
  TITO: { lat: 46.3590953431104, lng: 15.114277999897539, zoom: 19 }, //19
  KNEZA_MIHAILA: { lat: 44.8178417076029, lng: 20.456953370790494 },
  SVETI_SAVA: { lat: 44.79836657205494, lng: 20.469014611939595, zoom: 18 }, //18
  TERAZIJE: { lat: 44.81311140167507, lng: 20.46031248125328 },
  PRESERNOV_TRG: { lat: 46.051706802734735, lng: 14.506025769644634, zoom: 19 }, //19
  STARI_TRG: { lat: 46.0478082473441, lng: 14.506355642659566, zoom: 19 }, //19
  VELENJSKI_GRAD: { lat: 46.356706772992304, lng: 15.110039956160318, zoom: 19 }, //19
  TAJ_MAHAL: { lat: 27.175383395980482, lng: 78.04209928272022, zoom: 18 }, //18
  KITAJSKA: { lat: 40.432046510499205, lng: 116.57036416950146, zoom: 18 }, //18
  AKROPOLIS: { lat: 37.97180813773634, lng: 23.725677938252495, zoom: 17 }, //17
  MOAI: { lat: -27.126635965712424, lng: -109.28803858866135, zoom: 20 }, //20
  PYRAMIDS: { lat: 29.97942700994785, lng: 31.134153360802397 },
  COLOSSEUM: { lat: 41.890314007803894, lng: 12.492230898373048, zoom: 17 }, //17
  LIBERTY: { lat: 40.68977035450948, lng: -74.04437045720078, zoom: 19 }, //19
  BASCARSIJA: { lat: 43.85969520075921, lng: 18.431253920048785 },
}

const useLandmark = () => {
  const [landmark, setLandmark] = useState<{ lat: number; lng: number; zoom?: number }>()
  const [zoom, setZoom] = useState(17)

  const getRandomLandmark = () => {
    const keys = Object.keys(landmarks)
    const key = keys[(keys.length * Math.random()) << 0]
    //@ts-ignore
    const { zoom, ...lm } = landmarks[key]
    setLandmark(lm)
    zoom && setZoom(zoom)
  }

  useEffect(() => {
    getRandomLandmark()
  }, [])

  return [landmark, zoom] as const
}

export default useLandmark
